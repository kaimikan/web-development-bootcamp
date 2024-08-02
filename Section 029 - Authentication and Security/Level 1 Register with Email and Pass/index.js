import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'secrets',
  password: 'grespass',
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.username;
    const password = req.body.password;

    const checkResult = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send('Email already registered.');
    } else {
      await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [
        email,
        password,
      ]);
      res.render('secrets.ejs');
    }
  } catch (error) {
    console.error(error.message);
    res.redirect('/');
  }
});

app.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.username;
    const password = req.body.password;
    const response = await db.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (response.rows.length > 0) {
      res.render('secrets.ejs');
    } else {
      res.send('No user like that found.');
    }
  } catch (error) {
    console.error(error.message);
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
