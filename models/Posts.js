const mongoose = require('mongoose');



const postSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a name"]
        },
        compName: {
            type: String,
            required: [true, "insert Company Name"]
        },
        img: {
            type: String,
            required: [true, "insert image"]
        },
        industry:{
            type: String,
            required: [true, "Please provide your first name"]
        },
        upDown:{
            type: String,
            required: [true, "bullish or bearish"]
        },
        prediction: {
            type:String
        },
        comments:{
            type:[]
        }
    },
    {
        timestamps: true
    }
);

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;