var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3415/3584018816_dd8df27d17.jpg",
        description: "Lorem ipsum dolor sit amet, adhuc verterem evertitur ea vis, purto quaestio eam ea, detracto maiestatis vis ad. Nec summo nostrud intellegebat an, cum in nonumes eloquentiam. Eu per persius torquatos. Eos ea case mucius equidem, doming vivendo accumsan vis ex, melius eligendi dissentiunt ex has. Pro cu quaeque sanctus fierent, brute dicta labore duo te, quo an tantas phaedrum convenire."
    },  
    {
        name: "Desert Maser",
        image: "https://farm9.staticflickr.com/8572/16034357695_5ca6214f59.jpg",
        description: "Lorem ipsum dolor sit amet, adhuc verterem evertitur ea vis, purto quaestio eam ea, detracto maiestatis vis ad. Nec summo nostrud intellegebat an, cum in nonumes eloquentiam. Eu per persius torquatos. Eos ea case mucius equidem, doming vivendo accumsan vis ex, melius eligendi dissentiunt ex has. Pro cu quaeque sanctus fierent, brute dicta labore duo te, quo an tantas phaedrum convenire."
    },
    {
        name: "Canyon Fall",
        image: "https://farm3.staticflickr.com/2582/3820664827_6c2e9a69ae.jpg",
        description: "Lorem ipsum dolor sit amet, adhuc verterem evertitur ea vis, purto quaestio eam ea, detracto maiestatis vis ad. Nec summo nostrud intellegebat an, cum in nonumes eloquentiam. Eu per persius torquatos. Eos ea case mucius equidem, doming vivendo accumsan vis ex, melius eligendi dissentiunt ex has. Pro cu quaeque sanctus fierent, brute dicta labore duo te, quo an tantas phaedrum convenire."
    }]

function seedDB(){
    //REmove all campgrounds
    Campground.remove({}, function(err){
    if(err){
        console.log(err)
    }
    console.log("Removed Campground")
    //Add a few campgrounds
    data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
        if(err){
            console.log(err)
        }else{
            console.log("Created New Campground")
            //Create a comment on each campground
            Comment.create({
                text: "This place is great  but no internet",
                author: "Homer"
            }, function(err, comment){
                if(err){
                    console.log(err)
                }else{
                    campground.comment.push(comment);
                    campground.save();
                    console.log("Created a new comment")
                }
            })
        }
    })
});
});
    

}

module.exports = seedDB;