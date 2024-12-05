const { kMaxLength } = require('buffer');
const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String
        
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        min:9,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid!..")
            }
        }
    },
    age:{
        type:Number,
        min:18,
        
    },
    photoUrl:{
        type:String,
        default:"https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png",
    },
    about:{
        type:String,
        default:"This is a default about of the  user "
    },
    skills:{
        type:[String],
        
        
    }
},{
    timestamps:true
})

//Creating  a user model

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel;