const path = require("path")
const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRoute)



app.listen(PORT, () => console.log(`server Started at PORT:${PORT}`))