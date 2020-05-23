var mongoose=require("mongoose");
var event=require("./model/event.js");
var comment=require("./model/comment.js");
var data=[{name: "Lokdeep",
    image:"https://plantationcateringnewport.com/wp-content/uploads/2016/06/Advertise-Event-Planning-Business-in-Nigeria-1080x675.jpg",
    description:"I am Lokdeep Saluja I love to Create websites"},{name: "Lokdeep",
    image:"https://plantationcateringnewport.com/wp-content/uploads/2016/06/Advertise-Event-Planning-Business-in-Nigeria-1080x675.jpg",
    description:"I am Lokdeep Saluja I love to Create websites"},{name: "Lokdeep",
    image:"https://plantationcateringnewport.com/wp-content/uploads/2016/06/Advertise-Event-Planning-Business-in-Nigeria-1080x675.jpg",
    description:"I am Lokdeep Saluja I love to Create websites"}];

function seedDb(){
    event.remove({},function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            
            console.log("Removed");
            data.forEach(function(seed){
                Campground.create(seed, function(err, event){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a event");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    event.comments.push(comment);
                                    event.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
           
        }
    });
}

module.exports=seedDb;