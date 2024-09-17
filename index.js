// headers
import express from "express";
import bodyParser from "body-parser";

// constants
const app = express();
const port = 3000;
const posts = [];

// used to get information from an html form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// homepage that shows all posts
app.get("/", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/post", (req, res) => {
    res.render("post.ejs");
})

// post creation
    // must include blog creator's name, creation time, blog title, and blog itself
app.post("/post", (req, res) => {
    const newPost = {
        name: req.body.name,
        title: req.body.title,
        content: req.body.content,
        time: new Date() 
    };  
    posts.push(newPost);
    res.redirect("/");
});

// post editing
    // edit form where users can load the existing post, modify it, and save the updated post 
    // ensure that post gets updated
app.post("/edit", (req, res) => {
    const { index, title, content } = req.body;
    if (index < posts.length) {
        posts[index] = { ...posts[index], title, content };
    }
    res.redirect("/");
});

// post deletion
    // users can remove a post by clicking a button and post is removed from homepage
app.post("/delete", (req, res) => {
    const { index } = req.body;
    if (index < posts.length) {
        posts.splice(index, 1);
    }
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
      