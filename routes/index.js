var express = require('express');
var router = express.Router();
var userModel = require("./users");
var passport = require("passport");
var localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));



router.get("/",(req,res)=>{
  res.render("index");
})




router.get("/profile",isLoggedIn, (req,res)=>{
  res.render("profile");
});



// register route
router.post("/register",(req,res)=>{
  let userdata = new userModel({
    username : req.body.username,
    secret : req.body.secret
  });
  userModel.register(userdata,req.body.password)
  .then(function (registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  }) 
});


// login route
router.post("/login",passport.authenticate("local",{
  
  successRedirect :"/profile",
  failureRedirect :"/"
}),function(req,res){});



// logout route
router.get("/logout",function(req,res,next){
  req.logOut(function(err){
    if(err) return next(err);
    res.redirect("/");
  })
})


// isLoggedIn Middleware
function isLoggedIn(req,res,next){
 if(req.isAuthenticated()){
  return next();
 }
 res.redirect("/");
};





module.exports = router;
