//Routes
var express = require("express");
var router = express.Router();
var Campground = require ("../models/campground");
var middleware = require("../middleware");

//INDEX ROUTE- SHOW ALL CAMpGROUNDS
router.get("/campgrounds", function(req, res){
    // Get all Campgrounds from the Db
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log("There is an error")
        }else{
          res.render("campgrounds/index", {campgrounds:campgrounds, currentUser: req.user});
        }
    })
});

//CREATE- CREATE A NEW CAMPGROUNDS
router.post("/campgrounds", middleware.isLoggedIn, function(req,res){
    //Collects the neew campground and redirects to the campground'
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name: name, image: image, description: desc, author: author};
    // Create New CampGround And Add to DB
    Campground.create(newCamp, function(err, newly){
        if(err){
            console.log("There is An error")
        }else{
            res.redirect("/campgrounds");
        }
    })
});


//NEW- SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new")
});


//SHOWS MORE INFO ABOUT A CAMPGROUND 
router.get("/campgrounds/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comment").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/show", {campground: foundCampground})
        }
    });
});

//CAMPGROUND EDIT ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    //check if the user is logged in
    Campground.findById(req.params.id, function(err, foundCampground){
    res.render("campgrounds/edit", {campground: foundCampground})
    });       
});

//CAMPGROUND PUT EDIT FORM
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find the correct show page
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
    //redirect to the specific show page
});

//DESTROY ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds")
        }
    });
   
});

module.exports = router;