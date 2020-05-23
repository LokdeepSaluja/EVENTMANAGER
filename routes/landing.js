var express=require("express");
var router=express.Router();
var passport=require("passport");

var User=require("../model/User");




router.get("/",function(req,res){
    
    res.render("landing");
    });
    
    
router.get("/register",function(req,res){
        res.render("register");
    })
router.post("/register",function(req,res){
        var newUser=new User({username:req.body.username});
        console.log(newUser);
        User.register(newUser,req.body.password,function(err,user){
            if(err)
            {
                req.flash("error",err.message)
                console.log(err);
                return res.render("register");
            }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome "+user.username)
            res.redirect("/event");
        }) ;
    })});  
 router.get("/logout",function(req,res){
        req.logout();
        req.flash("success","You are logout");
        res.redirect("/event"); 
})
 router.get("/login",function(req,res){
    res.render("login");
    console.log("log");
    });
router.post("/login",passport.authenticate("local",
    {    
        successRedirect:"/event",
        failureRedirect : '/login'
        
    }),function(req,res){
               console.log("tried Login");
    });
    module.exports=router;