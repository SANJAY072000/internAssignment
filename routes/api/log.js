// importing the required modules
const express=require('express'),
router=express.Router(),
passport=require('passport'),
bcrypt=require('bcryptjs'),
mongoose=require('mongoose');


// importing the required schema
const Log=require('../../models/Log');


/*
@type - POST
@route - /api/log/create
@desc - a route to create logs
@access - PRIVATE
*/
router.post('/create',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {userPhone, userComment}=req.body;
    const userId=req.user._id;
    const newLog=new Log({userPhone,userComment,userId});
    newLog.save()
    .then(log=>res.status(200).json(log))
    .catch(err=>console.log(err));
    });


/*
@type - GET
@route - /api/log/allLogs
@description - A route to get the details of all logs
@access - PRIVATE
*/
router.get('/allLogs',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Log.find()
    .sort({date:'desc'})
    .then(log=>{
        if(!log.length)return res.status(200).json({'noLog':'No log is there'});
        return res.status(200).json(log);
    })
    .catch(err=>console.log(err));
});




// exporting the routes
module.exports=router;