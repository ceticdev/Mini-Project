// import express and body-parser middleware
import express from "express";
import bodyParser from "body-parser";
// create instance of Express app
const app = express();

// parse url encoded data
app.use(bodyParser.urlencoded({ extended: true }));
// serve the static files
app.use(express.static('public'));
// set ejs view engine
app.set('view engine', 'ejs');

const posts = [];  // Temporary array to hold posts

// get route for home page
app.get('/', (req, res) => {
    res.render('index', { posts });
  });

// serve new post form
app.get('/new', (req, res) => {
    res.render('new-post');
  });
  
// create new post
app.post('/new', (req, res) => {
    // breaks down form data
    const { title, author, content } = req.body;
    // create new post object with date and vars
    const newPost = { id: Date.now(), title, author, content, date: new Date().toLocaleString() };
    // add to posts array
    posts.push(newPost);
    // after posting, redirect to home page
    res.redirect('/');
  });

// edit a post
app.get('/edit/:id', (req, res) => {
    // search for post by id
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
      // if post is found, send to edit-post
      res.render('edit-post', { post });
    } else {
      // post not found, redirect to home
      res.redirect('/');
    }
  });
  
  // update post on edit form submission
  app.post('/edit/:id', (req, res) => {
    const { title, author, content } = req.body;
    const post = posts.find(p => p.id == req.params.id);
    // update post values
    if (post) {
      post.title = title;
      post.author = author;
      post.content = content;
    }
    res.redirect('/');
  });

  // deleting posts
  app.post('/delete/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id == req.params.id);
    if (postIndex !== -1) {
      // remove from array
      posts.splice(postIndex, 1);
    }
    res.redirect('/');
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
