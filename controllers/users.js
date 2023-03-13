const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const {Users} = require('../models')

router.get('/signup', (req,res)=>{
    res.render('user/signup.ejs')
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


router.post('/login', async(req, res, next) => {
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



router.post('/signUp', async (req,res,next)=>{
    try{
        const newUser = await Posts.create(req.body)
        console.log (newPost)
        res.redirect('/')
        return res.redirect('/index')
    }catch(err){
        console.log(err)
        return next()
    }
})



module.exports = router;