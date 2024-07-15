import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'book_archive',
  password: 'grespass',
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let locallySavedReviews = [];

async function getBookReviews() {
  try {
    const response = await db.query('SELECT * FROM book_reviews');
    const reviews = response.rows;
    locallySavedReviews = reviews;
    console.log({ reviews });
    return { reviews: reviews };
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
}

app.get('/', async (req, res) => {
  const responsePackage = await getBookReviews();

  res.render('index.ejs', responsePackage);
});

app.post('/add', async (req, res) => {
  console.log(req.body);

  try {
    await db.query(
      'INSERT INTO book_reviews (book_title, image_url, review, notes) VALUES ($1, $2, $3, $4)',
      [req.body.title, req.body.imgURL, req.body.review, req.body.notes]
    );
  } catch (error) {
    console.error(error.message);
  } finally {
    res.redirect('/');
  }
});

app.post('/delete', async (req, res) => {
  console.log('DELETE: ', req.body);
  try {
    await db.query('DELETE FROM book_reviews WHERE id = $1', [
      req.body.reviewID,
    ]);
  } catch (error) {
    console.error(error.message);
  } finally {
    res.redirect('/');
  }
});

app.post('/init-update', (req, res) => {
  console.log('UPDATE REDIRECT: ', req.query.id);
  // if i pass it as a param instead of query (/init-update/:id) the style can no longer find the route
  // i guess since it is 2 levels of identation
  const reviewToUpdate = locallySavedReviews.find(
    (review) => Number(review.id, 10) === Number(req.query.id, 10)
  );
  console.log(reviewToUpdate);
  res.render('update.ejs', { review: reviewToUpdate });
});

app.post('/update', async (req, res) => {
  console.log('UPDATE FORM: ', req.body);
  try {
    await db.query(
      'UPDATE book_reviews SET book_title = $1, image_url = $2, review = $3, notes = $4 WHERE id = $5',
      [
        req.body.title,
        req.body.imgURL,
        req.body.review,
        req.body.notes,
        req.body.id,
      ]
    );
  } catch (error) {
    console.error(error.message);
  } finally {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
