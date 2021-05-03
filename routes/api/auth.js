// importing the required modules
const express=require('express'),
router=express.Router(),
passport=require('passport'),
mongoose=require('mongoose'),
bcrypt=require('bcryptjs'),
jsonwt=require('jsonwebtoken');


// importing the required schema
const User=require('../../models/User');


// importing the secret key
const key=require('../../setup/config');


/*
@type - POST
@route - /api/auth/user/register
@description - A route to register the users
@access - PUBLIC
*/
router.post('/user/register',(req,res)=>{
const userEmail=req.body.userEmail.toUpperCase(),
userPassword=req.body.userPassword,
userAdmin=(req.body.userAdmin)?true:false,
userName=req.body.userName.toUpperCase();
User.findOne({userEmail})
.then(user=>{
if(user)
return res.status(200).json({'userAlreadyRegistered':'User is already registered'});
const newUser=new User({userName,userEmail,userPassword,userAdmin});
bcrypt.genSalt(10,(err,salt)=>{
bcrypt.hash(newUser.userPassword,salt,(err,hash)=>{
if(err)throw err;
newUser.userPassword=hash;
newUser.save()
.then(user=>res.status(200).json(user))
.catch(err=>console.log(err));
});
});
})
.catch(err=>console.log(err));
});


/*
@type - POST
@route - /api/auth/user/login
@description - A route to login the users
@access - PUBLIC
*/
router.post('/user/login',(req,res)=>{
const userEmail=req.body.userEmail.toUpperCase(),
userPassword=req.body.userPassword;
User.findOne({userEmail})
.then(user=>{
if(!user)
return res.status(200).json({'userNotRegistered':'User is not registered'});
bcrypt.compare(userPassword,user.userPassword)
.then(isCorrect=>{
    if(isCorrect){
        const payload={
            id:user._id,
            userName:user.userName,
            userEmail:user.userEmail,
            userPassword:user.userPassword
        };
        jsonwt.sign(payload,key.secret,{expiresIn:3600},(err,token)=>{
            if(err)throw err;
            return res.status(200).json({
                success:true,
                token:`Bearer ${token}`
            });
        });
    }
    else return res.status(200).json({'passwordIncorrect':'Password is incorrect'});
})
.catch(err=>console.log(err));
})
.catch(err=>console.log(err));
});


/*
@type - GET
@route - /api/auth/user/test
@description - A route to test login of the users
@access - PRIVATE
*/
router.get('/user/test',passport.authenticate('jwt',{session:false}),(req,res)=>{
User.findOne({_id:req.user._id})
.then(user=>res.status(200).json(user))
.catch(err=>console.log(err));
});







// exporting the routes
module.exports=router;