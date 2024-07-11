import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
let message = '';

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  message = 'Enter your name below 👇';
  res.render('index.ejs', {
    msg: message,
  });
});

app.post('/submit', (req, res) => {
  const name = req.body['fName'] + ' ' + req.body['lName'];
  const letterCount = name.length - 1;
  message = `There are ${letterCount} letters in your name.`;
  res.render('index.ejs', {
    msg: message,
    userName: name,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
