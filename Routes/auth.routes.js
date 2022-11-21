
const {signUpValidator} = require("../Middlewares");
const authController = require("../controllers/auth.controller");

module.exports = function(app){

    app.post("/ecomm/api/v1/auth/signup",[signUpValidator.checkDuplicateEmailOrUserName,signUpValidator.checkRolesExists],
    authController.signup);

    app.post("/ecomm/api/v1/auth/signin", authController.signIn);

    
    
}