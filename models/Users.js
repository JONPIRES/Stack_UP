const mongoose = require('mongoose');



const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a name"],
            unique: [true, "Username already exists"]
        }, 
        password: {
            type: String,
            required: [true, "please provide a password"]
        }, 
        email: {
            type: String,
            required: [true, "Please provide an email!"]
        },
        fName:{
            type: String,
            required: [true, "Please provide your first name"]
        },
        lName:{
            type: String,
            required: [true, "Please provide your first name"]
        },
        img: {
            type:String
        }
    },
    {
        timestamps: true
    }
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users;