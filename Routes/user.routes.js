const userController = require("../controllers/user.controllers");

module.exports=(app)=>{
    app.get("/ecomm/api/v1/users",userController.findAll);
}