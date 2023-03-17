const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
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
            comment:{
                type:String
            }
        }
    },
    {
        timestamps: true
    }
);

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;