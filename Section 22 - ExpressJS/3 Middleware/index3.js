import express from 'express';

const app = express();
const port = 3000;

// making a custom middleware
/*
const logger = function (req, res, next) {
  console.log('longhand logging method:', req.method);
  next();
};
*/
// longhand version ^

/*
const logger = (req, res, next) => {
  console.log('logging method :', req.method);
  next();
};
*/
// ^ shorthand

function logger(req, res, next) {
  console.log('logging method:', req.method);
  // next is needed so the program can proceed after the middleware has been loaded
  next();
}

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
