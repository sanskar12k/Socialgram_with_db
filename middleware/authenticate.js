const jwt = require('jsonwebtoken');
const User = require('../modules/User');

const Authenticate = async  (req,res,next) => {
    try{
      const token = req.cookies.jwtoken; //Token present in cookies
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY); //verifying Token

      const userData = await User.findOne({_id:verifyToken._id , "tokens.token":token});

      if(!userData){
          throw new Error('User not found');
      }

      req.token = token;
      req.userData = userData; 
      req.userID = userData._id;

      next();
    }
    catch(err) {
       res.status(401).send( 'No User Found') 
        console.log(err);
    }

}
module.exports = Authenticate;