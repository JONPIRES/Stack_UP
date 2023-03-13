const express = require('express');
const router = express.Router();

const {Users} = require('../models')

router.get('/signup', (req,res)=>{
    res.render('user/signup.ejs')
})




module.exports = router;