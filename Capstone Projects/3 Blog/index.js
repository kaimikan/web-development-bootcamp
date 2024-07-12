import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
let blogPosts = [
  {
    title: 'First Post',
    content: 'This is the content of the first blog post here.',
    timeText: new Date('2024-07-12').toDateString(),
  },
  {
    title: 'Second Post',
    content: 'This post is about a second post.',
    timeText: new Date('2024-07-12').toDateString(),
  },
  {
    title: 'Third Post',
    content: 'The trilogy is complete.',
    timeText: new Date('2024-07-12').toDateString(),
  },
];
const IS_USER_ADMIN = true;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/add', (req, res) => {
  res.render('add.ejs', { isAdmin: IS_USER_ADMIN });
});

app.get('/blog', (req, res) => {
  res.render('blog.ejs', { posts: blogPosts, isAdmin: IS_USER_ADMIN });
});

app.post('/post', (req, res) => {
  let newPostTitle = req.body['post-title'];
  let newPostContent = req.body['post-content'];
  let newPostTime = new Date().toDateString();
  let newPostObj = {
    title: newPostTitle,
    content: newPostContent,
    timeText: newPostTime,
  };
  blogPosts.push(newPostObj);
  res.render('blog.ejs', { posts: blogPosts, isAdmin: IS_USER_ADMIN });
});

app.get('/delete', (req, res) => {
  let postID = req.query.postIdDelete;
  blogPosts.splice(postID, 1);
  res.render('blog.ejs', { posts: blogPosts, isAdmin: IS_USER_ADMIN });
});

app.get('/updateStart', (req, res) => {
  let postID = req.query.postIdUpdate;
  let chosenPost = blogPosts[postID];
  res.render('update.ejs', { post: chosenPost, postId: postID });
});

app.post('/updateEnd', (req, res) => {
  let postID = req.body['post-id'];
  let updatedPostTitle = req.body['post-title'];
  let updatedPostContent = req.body['post-content'];
  let updatedPostTime = new Date().toDateString();
  let updatedPostObj = {
    title: updatedPostTitle,
    content: updatedPostContent,
    timeText: updatedPostTime,
  };
  blogPosts[postID] = updatedPostObj;
  res.render('blog.ejs', { posts: blogPosts, isAdmin: IS_USER_ADMIN });
});

app.get('/open', (req, res) => {
  let postID = req.query.postIdOpen;
  let chosenPost = blogPosts[postID];
  res.render('post.ejs', { post: chosenPost });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
