const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const postSchema = new Schema({
    name: {
        type:String,
        required:true
    },     
    post: {
            type: String,
            required: true
        },
        likes:{
            type:Number
        },
        date: {
            type:Date,
            default:Date.now
        }
        
    

})
const  Post = mongoose.model('posts' ,postSchema);

module.exports = Post;