var express=require("express");
var router=express.Router();
var event=require("../model/event");
var middlewareobj=require("../middleware");


   
router.get("/",function(req,res){
    console.log(req.user);
    event.find({}, function(err, event){
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("event",{event:event,currentUser:req.user});
    }  
});
       
    
});
router.post("/",middlewareobj.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var author={
        id: req.user._id,
        username:req.user.username
        
    }
    console.log(author);
    var Eve={name: name ,price: price, image:image ,description:description,author:author};
    
    event.create(Eve,function(err,event){
        if(err)
        {
            console.log(err);
        }
        else{
            //console.log(event);
            req.flash("success","Event Added");
    res.redirect("/event");
        }
    })
    //event.push(Eve);
    
    
});

router.get("/new",middlewareobj.isLoggedIn,function(req,res){
res.render("new");
});

router.get("/:id",function(req,res){
    event.findById(req.params.id).populate("comments").exec(function(err,eventfound){
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(eventfound);
            res.render("show",{event:eventfound});
        }
    });
    
});
router.get("/:id/edit", middlewareobj.a,function(req,res){
  

        event.findById(req.params.id,function(err,a){
           
                    res.render("edit",{event:a});
                     });
   
    
});
router.put("/:id",middlewareobj.a,function(req,res){
    event.findByIdAndUpdate(req.params.id,req.body.event,function(err,updateEvent){
        if(err){
            res.redirect("/event");
                }
                else{
                    res.redirect("/event/"+req.params.id);
                }


    });

});
router.delete("/:id", middlewareobj.a,function(req,res){
    event.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
            res.redirect("/event");
        }
        else
        {   req.flash("success","Event Removed");
            res.redirect("/event");
        }
    }); 

});

module.exports=router;