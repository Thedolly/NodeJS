const { User } = require("../models");
//const User = db.User;

exports.findAll = (req,res)=>{
    User.findAll()
    .then((users)=>{
        res.send(users)
    })
    .catch((err)=>{
        res.status(500).send({message:err.message ||"somthing went wrong"});
    })
}