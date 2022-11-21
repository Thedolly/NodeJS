const  jwt = require("jsonwebtoken");
const { User} = require("../models");

verifyToken=  (req,res,next)=>{

    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({message:"JWT token is missing"});
    }

    jwt.verify(token, process.env.SECRET_KEY,  function(err, decoded){

        if(err){
            return res.status(401).send({message:"unauthorized!"});
        }

        const userId = decoded.id;

        User.findByPk(userId)
       .then(user=>{
        console.log(user.dataValues);
        req.user=user.dataValues;
        next();
       })

       
       // console.log("err= " +err);
       //  console.log(decoded);
    });
    console.log("token = " +token);

}

const authJWT={
    verifyToken:verifyToken
}

module.exports=authJWT;