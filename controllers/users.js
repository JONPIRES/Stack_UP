const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const {Users} = require('../models')

router.get('/signup', (req,res)=>{
    res.render('user/signup')
})

router.get('/signin', (req, res) => {
    res.render('user/signin');
});


router.get('/logout', (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/users/signin');
    } catch(err) {
        console.log(err);
        return next();
    }
})


router.post('/signin', async(req, res, next) => {
    try {
        const loginAttempt = req.body;
        const userFound = await Users.findOne({username: loginAttempt.username});
        // If they didn't provide a valid username that exists, throw them to the register so they can create an account
        // if(!userFound) return res.redirect('/signup');
        // bcrypt compare will always return a boolean. Its true if they are the same and false if they don't match
        // bcrypt knows that the first is supposed to be plain text and it's comparing if that's what given to them when they hashed the password originally.
        const match = await bcrypt.compare(loginAttempt.password, userFound.password);
        console.log(match);
        if(!match) return res.send("Email or password doesn't match!");
        req.session.currentUser = {
            id: userFound._id,
            username: userFound.username,
        };
        return res.redirect('/posts');
    } catch(err) {
        console.log(err);
        return next();
    }
})



router.post('/signup', async(req, res, next) => {
    try {
        // set the usersInfo variable to what the user sent you in their form
        const usersInfo = req.body;
        console.log(usersInfo);
        // exists is just validating whether or not this user exists in the database. If they do, we don't create another one so we're going to just redirect them to the login page
        const userFound = await Users.exists({email: usersInfo.email});
        console.log(userFound);
        if(userFound) {
            return res.redirect('/login');
        } 
        // This is how many rounds of salt are added
        let salt = await bcrypt.genSalt(12);
        console.log(`My salt is ${salt}`);
        // create a hash
        const hash = await bcrypt.hash(usersInfo.password, salt);
        console.log(`My hash is ${hash}`)
        usersInfo.password = hash;
        const newUser = await Users.create(usersInfo);
        console.log(newUser);
        return res.redirect('/posts');
    } catch(err) {
        console.log(err);
        return next();
    }
});





module.exports = router;