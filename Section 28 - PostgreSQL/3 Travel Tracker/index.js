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

let visitedCountries = [];
let visitedCodes = [];
let totalCountries = 0;

async function getCountryCodes() {
  visitedCountries = [];
  visitedCodes = [];

  try {
    const result = await db.query('SELECT * FROM visited_countries');
    console.log(result.rows);
    visitedCountries = result.rows;
    totalCountries = visitedCountries.length;

    for (let i = 0; i < totalCountries; i++) {
      visitedCodes.push(visitedCountries[i].country_code);
    }
    console.log(visitedCodes);
    return visitedCodes;
  } catch (error) {
    console.error(error.message);
    return visitedCodes;
  }
}

app.get('/', async (req, res) => {
  let countryCodes = await getCountryCodes();

  res.render('index.ejs', {
    countries: countryCodes.toString(),
    total: countryCodes.length,
  });
});

app.post('/add', async (req, res) => {
  // note: in case you add a new country with a correct name but it doesn't register
  // it may just be that there is no svg matching its country code in the index.ejs
  const countryName = req.body.country;
  console.log(countryName);
  try {
    // notice LIKE % || name || % in order to match the country name even if the official name is something like The United Republic of...
    //LOWER() makes sure that it is not case sensitive
    const result = await db.query(
      "SELECT * FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [countryName.toLowerCase()]
    );

    const countryCode = result.rows[0].country_code;

    try {
      await db.query(
        'INSERT INTO visited_countries (country_code) VALUES ($1)',
        [countryCode]
      );

      //we can just return and re-fetch the updated table with the get request
      res.redirect('/');
    } catch (error) {
      console.error('POST: ', error.message);

      let countryCodes = await getCountryCodes();

      res.render('index.ejs', {
        countries: countryCodes.toString(),
        total: countryCodes.length,
        error: 'Country name already entered',
      });
    }
  } catch (error) {
    console.error('GET: ', error.message);

    let countryCodes = await getCountryCodes();

    res.render('index.ejs', {
      countries: countryCodes.toString(),
      total: countryCodes.length,
      error: 'Country name not found',
    });
  }
});

// db.query("INSERT INTO world_food (country, rice_production, wheat_production)
// VALUES ($1, $2, $3)",['Italy', 1.46, 7.3])

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
