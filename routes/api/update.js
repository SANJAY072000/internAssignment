// importing the required modules
const express=require('express'),
router=express.Router(),
passport=require('passport'),
bcrypt=require('bcryptjs'),
mongoose=require('mongoose');


// importing the required schema
const User=require('../../models/User');


/*
@type - POST
@route - /api/update/editDetails-:uid
@desc - a route to edit users details
@access - PRIVATE
*/
router.post('/editDetails-:uid',passport.authenticate('jwt',{session:false}),(req,res)=>{
    req.body.userAdmin=(req.body.userAdmin)?true:false;
    req.body.userName=req.body.userName.toUpperCase();
    req.body.userEmail=req.body.userEmail.toUpperCase();
    User.findOneAndUpdate({_id:req.params.uid},
    {$set:req.body},{new:true})
    .then(user=>{
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.userPassword,salt,(err,hash)=>{
            if(err)throw err;
            user.userPassword=hash;
            user.save()
            .then(user=>res.status(200).json(user))
            .catch(err=>console.log(err));
            });
            });
    })
    .catch(err=>console.log(err));
    
    });


/*
@type - GET
@route - /api/update/allUsers
@description - A route to get the details of all users
@access - PRIVATE
*/
router.get('/allUsers',passport.authenticate('jwt',{session:false}),(req,res)=>{
    User.find()
    .then(user=>{
        if(!user.length)return res.status(200).json({'noUser':'No user is there'});
        return res.status(200).json(user);
    })
    .catch(err=>console.log(err));
});




// exporting the routes
module.exports=router;