
const express = require('express');

const router = express.Router();

const { Posts } = require('../models');


router.get('/', async (req,res,next)=>{
try{
    if(req.session.user){
        const posts = await Posts.find({})
        res.render('posts/index.ejs', {posts:posts, user: req.session.user} )
    }
    else{
        res.redirect('/users/signin')
    }

}catch(err){
    console.log(err)
    return next()
}
})

router.get('/newPost',  (req,res)=>{
            console.log(req.session.user)

            if(req.session.user){
            return  res.render('posts/new.ejs', {user: req.session.user} )
            } else{
                res.redirect('/users/signin')
            }
})


router.get('/:id', async (req, res, next) => {
    try {
        if(req.session.user){
            const post = await Posts.findById(req.params.id);
            console.log(post);
            const context = {
                posts: post,
                user: req.session.user
            }
            res.render('posts/show.ejs', context);
        }else{
            res.redirect('/users/signin')
        }
    } catch(err) {
        console.log(err);
        return next();
    }
})


router.get('/:id/edit', async (req, res, next) => {
    try {
        const postEdit = await Posts.findById(req.params.id);
        res.render('posts/edit.ejs', {edit: postEdit,user: req.session.user})
    } catch(err) {
        console.log(err);
        return next();
    }
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

router.put('/:id/edit', async(req,res,next)=>{
    try{
        const editPost = await Posts.findByIdAndUpdate(req.params.id, req.body)
        console.log(editPost)
        res.redirect(`/posts/${req.params.id}`)
    }catch(err){
        console.log(err)
        return next()
    }
})

router.delete('/:id', async(req,res,next)=>{
    const deletePost = await Posts.findByIdAndDelete(req.params.id)
    res.redirect('/posts')
})








module.exports = router;