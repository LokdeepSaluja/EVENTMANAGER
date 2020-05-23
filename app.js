var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var event=require("./model/event.js");
var methodOverride=require("method-override");
var User= require("./model/User");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var seed=require("./seed");
var comment=require("./model/comment.js");
var flash=require("connect-flash");

var commentRoutes=require("./routes/comment"),
    eventRoutes=require("./routes/event"),  
    landingRoutes=require("./routes/landing");

app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb+srv://Lokdeep:rU7$*fp!W*eKw7*@cluster0-kgpvi.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true , useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine",".ejs");
app.use(flash());
app.use(methodOverride("_method"));
// seed();
app.use(require("express-session")({
    secret:"Lokdeep Saluja",
    resave:false,
    saveUnitialized:false
    }));



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   
   
   next();
});


app.use("/event/:id/comments",commentRoutes);
app.use("/event",eventRoutes);
app.use(landingRoutes);


app.listen(80,function(req,res){
    console.log("The Server Started");
});
