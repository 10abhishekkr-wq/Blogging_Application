const {Router}  = require("express");
const router = Router();

const User = require("../models/user");

router.post("/signup",async (req,res)=>{
    const {fullName,email,password} = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
})


router.get("/signin",(req,res)=>{
    return res.render("signin");
})

router.get("/signup",(req,res)=>{
    return res.render("signup");
})



module.exports = router;