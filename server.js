const express = require('express');
const app = express();

const methodOverride = require('method-override');

const{users, posts} = require('./controllers')

const session = require("express-session");
const MongoStore = require("connect-mongo");
require('dotenv').config();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use(
    session({
        // where to store the sessions in mongodb
        store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URI }),
        // secret key is used to sign every cookie to say its is valid
        secret: "super secret",
        resave: false,
        saveUninitialized: false,
        // configure the experation of the cookie
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // one week
        },
    })
);


app.get('/', (req,res) =>{
    res.render('home')
})

app.use('/posts', posts)
app.use('',users)


app.get("/*" , (req,res) =>{
    res.render("404");
})

app.listen(4000, function(){
    console.log('I am listening on port 4000')
})