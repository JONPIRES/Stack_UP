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