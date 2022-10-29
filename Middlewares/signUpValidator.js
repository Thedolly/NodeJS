const { User, ROLES } = require("../models");




const checkDuplicateEmailOrUserName = (req,res,next)=>{
    const {userName, email} = req.body;

    const userNamePromise=User.findOne({
        where:{
            userName:userName
        }
    });

    const emailPromise= User.findOne({
        where:{
            email:email
        }
    });

    Promise.all([userNamePromise,emailPromise])
    .then((users)=>{
        if(users[0] || users[1]){
           
            res.status(400).send({message:"Failed! username and email is already in use"});
            return;
        }
        next();
    })
    .catch((err)=>{
        
        res.status(500).send({message:err || "Something went wrong"});
    })
}

const checkRolesExists = (req,res,next)=>{
    const roles = req.body.roles;

    if(roles){
        for(let i=0;i<roles.length;i++){
            if(!ROLES.includes(roles[i])){
                res.status(400).send({message:"Failed! Role does not exist"+roles[i]});
                return;
            }
        }
    }
    next();
}

const verifySignUp={
    checkDuplicateEmailOrUserName,
    checkRolesExists
}

module.exports = verifySignUp;