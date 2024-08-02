import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
var customWeekMessage = '';
var day;
app.use(bodyParser.urlencoded({ extended: true }));

function generateWeekMessage(req, res, next) {
  var date = new Date();
  day = date.getDay();
  console.log(day);
  if (day != 6 || day != 0) {
    customWeekMessage = "Yo, it's a weekday, work hard!";
  } else {
    customWeekMessage = "Yo, it's the weekend, work hard!";
  }
  next();
}

app.use(generateWeekMessage);

app.get('/', (req, res) => {
  // notice this dynamic way of opening a file without send or sendFile
  res.render('index.ejs', { message: customWeekMessage });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
