
const express = require('express');

const router = express.Router();

const { Posts } = require('../models');


router.get('/', async (req,res,next)=>{
try{
    if(req.session.user){
        const posts = await Posts.find({})
        res.render('posts/index.ejs', {posts:posts} )
    }
    res.redirect('/users/signin')

}catch(err){
    console.log(err)
    return next()
}
})

router.get('/newPost', (req,res)=>{
    if(req.session.user){
        res.render('posts/new.ejs')
    }
    res.redirect('/users/signin')
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

router.get('/posts/:id', async (req, res, next) => {
    try {
        const post = await Posts.findById(req.params.id);
        console.log(post);
        const context = {
            post: post
        }
        res.render('posts/show.ejs', context);
    } catch(err) {
        console.log(err);
        return next();
    }
})


router.get('/:id/edit', async (req, res, next) => {
    try {
        const postEdit = await Posts.findById(req.params.id);
        res.render('posts/edit.ejs', {edit: postEdit})
    } catch(err) {
        console.log(err);
        return next();
    }
})



module.exports = router;