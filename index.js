import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var postList = {};
var postExists = false;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index.ejs", {
        postList: postList,
    });
});

app.get("/create", (req, res) => {
    res.render("create.ejs", {
        postExists: postExists,
    });
});

app.post("/create/add", (req, res) => {
    const title = req.body["title"];
    const post = req.body["post"];

    if (postList[title]) {
        postExists = true;
        res.redirect("/create");
    } else {
        postList[title] = post;
        postExists = false;
        res.redirect("/");
    }
});

app.post("/post-content", (req, res) => {
    const title = req.body["title"];
    const post = postList[title];

    res.render("post-content.ejs", {
        title: title,
        post: post,
    });
    
});

app.listen(port, () => {
    console.log(`Server open on port ${port}`);
});