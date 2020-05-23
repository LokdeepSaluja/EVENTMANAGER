var event=require("../model/event.js");
var middlewareobj={};
middlewareobj.a=function (req, res, next)
{
    if(req.isAuthenticated()){

    event.findById(req.params.id,function(err,a){
        if(err)
        {
            res.redirect("back");
        }
        else
        {  
             if(a.author.id.equals(req.user._id)){
                next();
             }
             else{
                 res.redirect("back");
             }
        }   
    });  
        
    }
        
    
else{
    res.redirect("back");
}
};
    middlewareobj.isLoggedIn=function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error","Need to login first");
    res.redirect("/login");
}
module.exports=middlewareobj;