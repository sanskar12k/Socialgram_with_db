const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../../middleware/authenticate');

const User = require('../../modules/User');
const Post = require('../../modules/Posts');

// @route : /api/users/test
// @desc : To check
// @access : Public
router.get('/test' , (req,res) =>{
    res.json({msg: 'users Works'})
   }
);


// @route : /api/users/register
// @desc : To register new users
// @access : Public

router.post('/register' , async (req,res) => {
      const {fname, email, phone, password} = req.body;
      
      if ( !fname|| !email || !phone || !password  ){
         res.status(422).send({error: 'Please fill all the columns'});
          }
      try{
          const userExist = await  User.findOne({email:email});

          if(userExist) {
             res.status(422).json({error: "User already existed"});
            
          }

        //   else if(password != cpassword){
        //      res.status(422).json({error:"Password doesn't match"});
        //      return;}
          
          else{
            const user = new User({fname,  email,  phone, password});
           
            //Saves data to db
            await user.save();
   
            res.status(201).json({message: "Registartion Successful!!"});
            return;
         } 
          }
         
      catch(err) {
          console.log(err);
      }
    })
//@route :/api/users/post
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

 // @route : /api/users/login
 // @desc : To login for registered user
 // @access : Public
router.post('/login', async (req,res)=> {
    const {email, password} = req.body;
    if(!email || !password){
        req.status(400).json({err: "Please fill all the columns"});
    }

    //Check for email existence 
    try{
       const userEmail = await User.findOne({email:email});
       if (userEmail){
    
       const userPassword = await bcrypt.compare(password, userEmail.password);
       const token = await userEmail.generateAuthToken();

       res.cookie('jwtoken', token, {
           expires: new Date(Date.now() + 1296000000 ), //1296000000ms = 15days
       })
        
        if(userPassword){
            res.json({message:"Login Successful"});
        }else(res.status(400).json({err:"Invalid Credential"}))
       
       }else {
        res.status(400).json({err:"Invalid Credential mail "});
       }
    }
    catch(err){
       console.log(err);
        }
    })


    router.get('/profile', authenticate , (req,res) => {
    res.send(req.userData);
    })

    router.get('/logout',(req,res) => {
        res.clearCookie('jwtoken' , {path:'/'});
        res.status(200).send('User logout');
    } )
    // router.get('/posts', (req,res )=> {
    //     Post.find()
    //         .sort({date: -1})
    //         .then (post=> res.json(post))
    //         .catch(err => res.status(404))
    // });
    // router.get('/posts/:id', (req,res )=> {
    //     Post.findById(req.params.id)
    //         .sort({date: -1})
    //         .then (post=> res.json(post))
    //         .catch(err => res.status(404).json({error:"No Post Found"}))
    // });

module.exports = router;
