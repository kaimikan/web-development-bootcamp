import express from 'express';
// morgan is used for HTTP request logging
import morgan from 'morgan';

const app = express();
const port = 3000;

// mounting morgan
// type = 'tiny'/'combined'
app.use(morgan('tiny'));
// example combined output - ::1 - - [11/Jul/2024:09:46:16 +0000] "GET / HTTP/1.1" 200 5 "-" "PostmanRuntime/7.40.0"
// example tiny output -  200 5 - 2.093 ms

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
