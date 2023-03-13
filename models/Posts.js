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
        }
    },
    {
        timestamps: true
    }
);

const Posts = mongoose.model('Posts', userSchema);

module.exports = Posts;