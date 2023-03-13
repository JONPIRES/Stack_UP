const mongoose = require('mongoose');



const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a name"],
            unique: [true, "Must be original. Apparently you're not"]
        }, 
        password: {
            type: String,
            required: [true, "Please provide the URL for an image"]
        }, 
        email: {
            type: String,
            required: [true, "Please provide me with an email!"]
        }
    },
    {
        timestamps: true
    }
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users;