var express=require("express");
var router=express.Router({mergeParams: true});
var event=require("../model/event.js");
var comment=require("../model/comment.js");
var middlewareobj=require("../middleware");
//middleware


// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//     return next;
//     }res.redirect("/login");
// }
// ;

router.get("/new",middlewareobj.isLoggedIn,function(req,res){
    console.log(event);
    event.findById(req.params.id,function(err,event){
        if(err)
        {
            console.log(err);
        }
        else{ 
            req.flash("success","Enter the details");
            res.render("news",{event:event});
        }
    })
    
});
router.delete("/:comment_id",function(req,res){
    comment.findByIdAndRemove(req.params.comment_id,function(err)
    {
        if(err)
        {
            res.redirect("back");
        }
        else{
            req.flash("success","Event removed");
            res.redirect("/event/"+req.params.id);
        }
    }
    )
})
router.put("/:comment_id/edit",function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
        if(err)
        {
            res.redirect("back");
        }
        else{
           
            res.redirect("/event/"+req.params.id);
        }
    })
});
router.get("/:comment_id/edit",function(req,res){
    comment.findById(req.params.comment_id,function(err,b){
        if(err)
        {
            res.redirect("back");
        }
        else{
            req.flash("success","Comment updated");
            res.render("edit1",{event_id:req.params.id,comment:b});
        }
    })
    
})
router.post("/", function (req, res) {
    console.log(req.body.comment);
    event.findById(req.params.id, function (err, event) {
        if (err) {
            console.log(err);
            res.redirect("/event");
        }
        else {
 
            comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                }
                else {
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    event.comments.push(comment);
                    event.save();
                    res.redirect('/event/' + event._id);
                }
            })
        }
    })
});


module.exports=router;