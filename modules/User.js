const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema =  mongoose.Schema;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});


const userSchema = new Schema({

        fname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        
        date: {
            type: Date,
            default: Date.now()
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ]

    })

//Hashing our password    
//Calling this function before saving our data to db
 userSchema.pre('save' , async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        // this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
 });
 
 //Token Generation
 userSchema.methods.generateAuthToken = async function (){
     try{
         let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
         this.tokens = this.tokens.concat({token:token});  // Here first token stand for token in userSchema and second one for variable defined in above line
         await this.save();
         return token; // to use in other files
     }catch(err){
         console.log(err);
     }
 }

 //Collecion creation
  const  User = mongoose.model('users' ,userSchema);

    module.exports = User;



    
