import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcrypt';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(
  session({
    secret: 'TOP SECRET!!!',
    // resave - gives option to save the session to the db instead of browser
    resave: false,
    saveUninitialized: true,
    cookie: {
      // a cookie now lasts 24 hours
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
// session first
// passport after
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'secrets',
  password: 'grespass',
  port: 5432,
});
db.connect();

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.get('/secrets', (req, res) => {
  console.log(req.user);
  // isAuthenticated comes from passport
  if (req.isAuthenticated()) {
    res.render('secrets.ejs');
  } else {
    res.redirect('/login');
  }
});

app.post('/register', async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send('Email already exists. Try logging in.');
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
        } else {
          console.log('Hashed Password:', hash);
          const result = await db.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log(err);
            res.redirect('/secrets');
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// login now uses the local strategy we defined
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/secrets',
    failureRedirect: '/login',
  })
);

//cb = callback
//
passport.use(
  new Strategy(async function verify(username, password, cb) {
    // if the names match the form names for the username and pass fields we do not need to do req.body.username and req.body.password
    // to get them, they will assign to the function as seen below
    console.log(username, password);

    try {
      const result = await db.query('SELECT * FROM users WHERE email = $1', [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, result) => {
          if (err) {
            return cb(err);
          } else {
            if (result) {
              const errors = null;
              return cb(errors, user);
            } else {
              const errors = null;
              const isUserAuthenticated = false;
              return cb(errors, isUserAuthenticated);
            }
          }
        });
      } else {
        return cb('User not found.');
      }
    } catch (err) {
      return cb(err);
    }
  })
);

// saves user to local session
passport.serializeUser((user, cb) => {
  cb(null, user);
});

// retrieves user from local session
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
