const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String
        
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String
    },
    age:{
        type:Number
    },
    photoUrl:{
        type:String,
        default:"https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png",
    },
    about:{
        type:String,
        default:"This is a default about of the user "
    },
    skills:{
        type:[String],
        
    }
})

//Creating  a user model

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel;