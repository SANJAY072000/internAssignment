// importing the required modules
const mongoose=require('mongoose'),
Schema=mongoose.Schema;


// creating the customer schema
const logSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'userSchema'
    },
    userPhone:{
        type:String,
        required:true
    },
    userComment:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});


// exporting the schema
module.exports=mongoose.model('logSchema',logSchema);



