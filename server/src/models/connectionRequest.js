const mongoose = require('mongoose');


const connectionRequestSchema = new mongoose.Schema({
    //fromUserID

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:['ignored','interested','accepted','rejected'],
            message:`{VALUE}is incorrect status type..`
        }
    }
},{
    timestamps:true,
});

//Creating a model

const ConnectionRequest = new mongoose.model('ConnectionRequest',connectionRequestSchema);

module.exports =ConnectionRequest;
