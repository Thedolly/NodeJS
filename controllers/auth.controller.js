
const {User, Role, Sequelize, ROLES} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup= async (req,res)=>{
   

    var {userName, email, password, roles} = req.body;

    if(!roles || !roles.length){
        roles=[ROLES[0]];
    }

    const user = await User.create({userName,email,password:bcrypt.hashSync(password,8)});
    
    const userRoles = await Role.findAll({where:{name:{[Sequelize.Op.or]:roles}}});

    await user.setRoles(userRoles);
    res.send({message:"user registered successfully"});
   // console.log("err1")

}

exports.signIn = async (req,res)=>{

    var {username , password } = req.body;

    if(!username || !password){
        res.status(400).send({message:"username and pwd can not be empty"});
    }
try{
    var user = await User.findOne({where:{userName:username}})
}catch(e){
    res.status(500).send({message:e.message});
}
    if(!user){
        return res.status(400).send({message:"username not exist"});
    }
        //check pwd  

        var isPasswordValid = bcrypt.compareSync(password, user.password);


        if(!isPasswordValid){
            res.status(401).send({message:"password not match"});
        }

        //  jwt.sign({ id: user.id }, process.env.SECRET_KEY, { algorithm: 'HS256'}, function(err, token){
        //     console.log(err);
        //     console.log(token);
        //  });

         const token =jwt.sign({ id: user.id }, process.env.SECRET_KEY,{expiresIn:86400});
        console.log(token);
   
        //res.send(user)
        res.send({
            id:user.id,
            userName:user.username,
            email:user.email,
            roles:user.roles,
            accessToken:token
        })
  
}