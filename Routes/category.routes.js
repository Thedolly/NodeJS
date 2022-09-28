const categoryControllers = require("../controllers/category.controllers");


module.exports = (app) => {
    //create new category
    app.post("/ecomm/api/v1/category", categoryControllers.create);

    //get all the routes
    app.get("/ecomm/api/v1/category", categoryControllers.getAll);

    //get by id
    app.get("/ecomm/api/v1/category/:id", categoryControllers.getOne);

    //update route by category id
    app.put("/ecomm/api/v1/category/:id", categoryControllers.update);

    //delete route by category
    app.delete("/ecomm/api/v1/category/:id", categoryControllers.delete);

    

}