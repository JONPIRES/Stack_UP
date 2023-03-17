const mongoose = require('mongoose');

const comSchema = new mongoose.Schema(
    {
        comment:{
            type:String
        },
        username:{
            type:String
        }
    }
)

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        username: {
            type: String,
            required: [true, "insert Company Name"]
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
        comments:[comSchema]
    },
    {
        timestamps: true
    }
);

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;