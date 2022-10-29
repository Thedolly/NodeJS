
const {User, Role, Sequelize, ROLES} = require("../models");
const bcrypt = require("bcrypt");

exports.signup=(req,res)=>{
   

    var {userName, email, password, roles} = req.body;

    if(!roles || !roles.length){
        roles=[ROLES[0]];
    }
    console.log("err1")

    User.create({
        userName:userName,
        email:email,
        password:bcrypt.hashSync(password,8)
    })
    .then(user=>{
       console.log(user);
            Role.findAll({
                where:{
                    name:{
                        [Sequelize.Op.or] : roles
                    }
                }
            })
            .then(roles=>{
                user.setRoles(roles)
                .then(()=>{
                    res.send({message:"user registered successfully"});
                })
            })
        
    })
    .catch((err)=>{
       
        res.status(500).send({message:err || "Something went wrong"});
    })
}