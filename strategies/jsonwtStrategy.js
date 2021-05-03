// importing the required modules
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


// importing the required schema
const User=require('../models/User');


// importing the secret key
const key=require('../setup/config');


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secret;


// exporting the strategy
module.exports=passport=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    User.findById(jwt_payload.id)
    .then(user=>{
        if(user)return done(null,user);
        else return done(null,false);
    })
    .catch(err=>console.log(err));
}));
}