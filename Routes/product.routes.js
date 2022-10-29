
const ProductControllers = require("../controllers/product.controllers");
const {requestValidator} = require("../Middlewares");

module.exports=(app)=>{

    app.post("/ecomm/api/v1/products", requestValidator.validateProductRequest, ProductControllers.create);

     app.get("/ecomm/api/v1/products", ProductControllers.findAll);

     app.get("/ecomm/api/v1/products/:id", ProductControllers.findOne);

     app.put("/ecomm/api/v1/products/:id", ProductControllers.update);

     app.delete("/ecomm/api/v1/products/:id", ProductControllers.delete);

     //route for getting a list of product under particular category id
     app.get("/ecomm/api/v1/category/:categoryId/products", requestValidator.validateCategoryPassed, ProductControllers.findProductsUnderCategory);

     //you want a product with a productId under a category as categoryId
    app.get("/ecomm/api/v1/category/:categoryId/products/:productId", requestValidator.validateCategoryAndProductPassed, ProductControllers.findProductUnderCategory);

    

}