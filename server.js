const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const posts = require('./routes/api/posts');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const cookieParser =require('cookie-parser');



const app = express();
app.use(cookieParser()) ;

require('./db/conn')

//Converting data to string
app.use(express.json());

const port = process.env.PORT || 5000;



const middleWare = (req,res, next) => {
    console.log('This is middleware');
    next();
};    

//Linking router file
app.use('/api/users' , users);
app.use('/api/posts' , posts);
app.use('/api/profile' , profile);
    
app.get ("/" ,(req,res) =>{ res.send ("Hello Baba Ji, Baba ji ki Jai")});

 
if(process.env.NODE_ENV == 'production'){
    app.use(express.static('web/build'));
    const path = require("path");

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'web', 'build', 'index.html'));

    })
}

app.listen(port, () =>{
    console.log(`Server on ${port}`);
})