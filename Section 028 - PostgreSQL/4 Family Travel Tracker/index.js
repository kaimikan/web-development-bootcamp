import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: 'grespass',
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let currentUserId = 1;

let users = [
  { id: 1, name: 'Angela', color: 'teal' },
  { id: 2, name: 'Jack', color: 'powderblue' },
];

async function checkVisisted(userID) {
  const result = await db.query(
    'SELECT country_code FROM visited_countries WHERE user_id = $1',
    [userID]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function fetchUsers() {
  const result = await db.query('SELECT * FROM users');
  users = result.rows;

  return users;
}

// very different way to do it than the solution,
// using no joins here and passing query params to the home route
app.get('/', async (req, res) => {
  users = await fetchUsers();

  console.log(req.query);
  const userId = req.query.id ? req.query.id : 1;
  currentUserId = userId;
  console.log({ userId });
  console.log({ users });
  const user = users.find((usr) => Number(usr.id, 10) === Number(userId, 10));
  console.log(user);

  const countries = await checkVisisted(user.id);
  // console.log(users);
  res.render('index.ejs', {
    countries: countries,
    total: countries.length,
    users: users,
    color: user.color,
  });
});

app.post('/add', async (req, res) => {
  const input = req.body['country'];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        'INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)',
        [countryCode, currentUserId]
      );
      res.redirect(`/?id=${currentUserId}`);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/user', async (req, res) => {
  console.log(req.body);
  if (req.body.add) {
    res.redirect('/new');
  } else {
    res.redirect(`/?id=${req.body.user}`);
  }
});

app.get('/new', async (req, res) => {
  res.render('new.ejs', {});
});

app.post('/new', async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  // INSERT INTO users (firstname, lastname) VALUES ('Joe', 'Cool') RETURNING id;
  console.log('New user: ', req.body.name, req.body.color);
  const newUserName = req.body.name;
  const newUserColor = req.body.color;
  try {
    const result = await db.query(
      'INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id;',
      [newUserName, newUserColor]
    );
    const addedUserID = result.rows[0].id;
    console.log('new user id: ', addedUserID);
    res.redirect(`/?id=${addedUserID}`);
  } catch (error) {
    console.error(error.message);
    res.redirect('');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
