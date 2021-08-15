const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require('../../middleware/authenticate');

const User = require('../../modules/User');
const Post = require('../../modules/Posts');

//@route :/api/profile/post
router.post('/post' , async (req,res) => {
    const postcontent = new Post();
    const {name, post} = req.body;
    postcontent.name = req.body.name;
    postcontent.post = req.body.post;
 
  if ( !req.body.name|| !req.body.post ){
    res.status(422).send({error: 'Please fill all the columns'});
     }
 try{    
    //  let postinside = req.body.post

    //  postcontent.posts = postcontent.posts.concat({post:postinside});
        //Saves data to db
        await postcontent.save();

        res.status(201).json({message: "Post Successful!!"});
        return;
     
      }
     
  catch(err) {
      console.log(err);
  }
})

router.get('/posts', (req,res )=> {
    Post.find()
        .sort({date: -1})
        .then (post=> res.json(post))
        .catch(err => res.status(404))
});
router.get('/posts/:id', (req,res )=> {
    Post.findById(req.params.id)
        .sort({date: -1})
        .then (post=> res.json(post))
        .catch(err => res.status(404).json({error:"No Post Found"}))
});

router.get('/test' , (req,res) =>res.json({msg: 'profile Works'}));


module.exports = router;
