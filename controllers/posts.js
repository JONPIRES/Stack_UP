
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

router.get('/:id/comment', async (req, res, next) => {
    try {
        const newComment = await Posts.findById(req.params.id);
        res.render('posts/comment.ejs', {posts: newComment, user: req.session.user})
    } catch(err) {
        console.log("err");
        return next();
    }
})


router.get('/search', async (req,res, next) =>{
    try{
        let mySearch;    
        let query= req.query.s
        query = query.toLowerCase();
        query = (query.charAt(0).toUpperCase() + query.slice(1));
            if (query){
                mySearch = await Posts.find( { $or: [ { compName: query }, { industry:query } ] } )
                console.log ('If statement') 
                console.log (query) 
             }
        
         context = {
            posts: mySearch,
            user: req.session.user
        }
        res.render('posts/index.ejs', context)
    }
    catch(err){
        console.log(err);
        return next();
    }
})



router.post('/newPost', async (req,res,next)=>{
    try{
        req.body.user = req.session.user._id
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
router.put('/:id/comment', async(req,res,next)=>{
    try{
        const post = await Posts.findById(req.params.id)
        // post doesn't need it because the const post already got it from the db
        post.comments.push({username:req.body.username, comment:req.body.comment})
        // nnow you need to send it back with the save and that's why you do the await here and not on the push.
        await post.save()
        console.log(post)
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