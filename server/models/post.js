const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[
        {
            type:ObjectId,
            ref:"user"//refer to user model
        }
    ],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"user"},
        name:String
    }],
    postedBy:{
        type:ObjectId,
        ref:"user"//refer to user model
    }
})

mongoose.model("Post",postSchema)