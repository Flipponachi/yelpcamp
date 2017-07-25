//MIDDLEWARE 
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.isLoggedIn = function (req, res, next){
     if (req.isAuthenticated()){
         return next();
     }
     res.redirect("/login");
 };

middlewareObj.checkCampgroundOwnership = function (req, res, next){
         //check if the user is logged in
        if(req.isAuthenticated()){
                Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    res.redirect("back")
                }else{
                    //Does Use own the campground
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    }else{
                        //req.flash("error", "Permission Denied");
                        res.redirect("back");
                    }
                    
                }
            })
        }else{
            //req.flash("error", "You need to Be Logged IN")
            res.redirect("back")
        }
         
 };
 
 middlewareObj.checkCommentOwnership = function (req, res, next){
     //check if the user is logged in
    if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("/campgrounds")
            }else{
                //Does User own the comment 
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
                
            }
        })
    }else{
        res.redirect("back")
    }
     
 };



 

module.exports = middlewareObj;