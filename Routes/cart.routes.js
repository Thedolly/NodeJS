const {authJWT} = require("../Middlewares");
const cartController = require("../controllers/cart.controller")

module.exports = function(app){

    app.post("/ecomm/api/v1/carts",[authJWT.verifyToken], cartController.create);

    app.get("/ecomm/api/v1/carts",[authJWT.verifyToken], cartController.findCart);
}