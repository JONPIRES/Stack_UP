
const express = require('express');

const router = express.Router();

const { Posts } = require('../models');


router.get('/', async (req,res,next)=>{
try{
    const posts = await Posts.find({})
    res.render('posts/index.ejs', )

}catch(err){
    console.log(err)
    return next()
}
})

router.get('/create', (req,res)=>{
    res.render('posts/new.ejs')
})



router.post('/newPost', async (req,res,next)=>{
    try{
        const newPost = await Posts.create(req.body)
        console.log (newPost)
        res.redirect('/posts')
    }catch(err){
        console.log(err)
        return next()
    }
})


module.exports = router;