const path = require("path")
const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {checkForAuthenticationCookie} = require("./middlewares/authentication");
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then((err) => console.log("Mongodb connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use("/user", userRoute)
app.use(cookieParser()); 
app.use(checkForAuthenticationCookie("token"));


app.get("/",(req,res)=>{
    res.render("home",{
        user:req.user,
    });
});


app.listen(PORT, () => console.log(`server Started at PORT:${PORT}`))