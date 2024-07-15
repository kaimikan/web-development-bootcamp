import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'permalist',
  password: 'grespass',
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let items = [
  { id: 1, title: 'Buy milk' },
  { id: 2, title: 'Finish homework' },
];

app.get('/', async (req, res) => {
  try {
    const response = await db.query('SELECT * FROM items');
    items = response.rows;
    console.log({ items });

    res.render('index.ejs', {
      listTitle: 'List',
      listItems: items,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.post('/add', async (req, res) => {
  try {
    const item = req.body.newItem;
    const response = await db.query('INSERT INTO items (title) VALUES ($1)', [
      item,
    ]);
    items = response.rows;
    console.log(item);

    res.redirect('/');
  } catch (error) {
    console.error(error.message);
  }
});

app.post('/edit', async (req, res) => {
  try {
    console.log('EDIT: ', req.body);
    const itemId = req.body.updatedItemId;
    const itemTitle = req.body.updatedItemTitle;

    await db.query('UPDATE items SET title = $1 WHERE id = $2', [
      itemTitle,
      itemId,
    ]);

    res.redirect('/');
  } catch (error) {
    console.error(error.message);
  }
});

app.post('/delete', async (req, res) => {
  console.log('DELETE: ', req.body);
  const itemId = req.body.deleteItemId;

  try {
    await db.query('DELETE FROM items WHERE id = $1', [itemId]);

    res.redirect('/');
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
