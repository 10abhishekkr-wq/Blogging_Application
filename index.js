const path = require("path")
const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {checkForAuthenticationCookie} = require("./middlewares/authentication");
const PORT = 3000;

const Blog = require("./models/blog");
mongoose.connect("mongodb://127.0.0.1:27017/blogify").then((err) => console.log("Mongodb connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRoute),
app.use("/blog", blogRoute)


app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});


app.listen(PORT, () => console.log(`server Started at PORT:${PORT}`))