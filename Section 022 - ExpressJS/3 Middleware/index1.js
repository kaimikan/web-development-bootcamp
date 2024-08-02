import express from 'express';
import bodyParser from 'body-parser';

// ---
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
// --- ^ used to generate the exact path to the project directory

const app = express();
const port = 3000;

// mounting the middleware (in this case body-parser)
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// matches the action and method of the form from index.html
app.post('/submit', (req, res) => {
  // req.body is a property created by body-parser
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
