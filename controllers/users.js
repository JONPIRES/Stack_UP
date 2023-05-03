const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const {Users, Posts} = require('../models')

router.get('/signup', (req,res)=>{

    res.render('user/signup', {user: req.session.user})
})

router.get('/signin', (req, res) => {

    res.render('user/signin', {user:req.session.user});
});

router.get('/profile', async(req,res,next)=>{
   try{
       if(req.session.user){
        // console.log(req.session.user)
        res.render('user/profile', {user:req.session.user})
       }else{
        res.redirect('/users/signin')
       }}catch(err){
    console.log(err)
    next()
   }
})

router.get('/:id/edit', async (req,res,next)=>{
    console.log(req.session.user)
    res.render('user/edit.ejs', {user: req.session.user})
})



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
        // console.log(userFound)
        if(!userFound){
           return res.send("<h1>Email or password doesn't match!</h1>");
        }
        else if(userFound){
            const match = await bcrypt.compare(loginAttempt.password, userFound.password);
            console.log(userFound);
            // if statement only works if the username is correct, if the username does not exist, it thorws an error.
            if(!match) return res.send("<h1>Email or password doesn't match!</h1>");
        }

            
        delete userFound.password;
        req.session.user = userFound;
        console.log(req.session.user.id)
        res.redirect('/posts');
            
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
            res.redirect('/users/signin');
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
// action needs to be for users/edit
router.put('/:id/edit', async(req,res,next)=>{
    try{
        const editUser = await Users.findByIdAndUpdate(req.params.id, req.body,{new:true})
        console.log("this is the new user",editUser ) 
        
        req.session.user = editUser
        res.redirect('/users/profile')
    }catch(err){
        console.log(err)
       return next()
    }

})

router.delete('/:id/delete', async (req,res,next)=>{
    try{
        const DeleteUser = await Users.findByIdAndDelete(req.params.id)
        // look up how to find all posts and delete the ones that I made

        // const deletePosts = await Posts.find
        
        req.session.destroy();
        res.redirect('/users/signin')
    }catch(err){
        console.log(err)
        return next()
    }
})



module.exports = router;