const express = require('express');
const app = express();

const methodOverride = require('method-override');

const{users, posts} = require('./controllers')


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));


app.get('/', (req,res) =>{
    res.render('home')
})

app.use('/users',users)


app.get("/*" , (req,res) =>{
    res.render("404");
})

app.listen(4000, function(){
    console.log('I am listening on port 4000')
})