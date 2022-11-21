const express = require("express");
const config = require("./configs/db.config"); 
const bodyParser = require("body-parser");
const db = require("./models");
const {authJWT} =require("./Middlewares");

const {Role} = require("./models");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());


// const products = db.products;

db.sequelize.sync({force:false})
.then(()=>{
    console.log("db synced");
})

//import Auth routes
require("./Routes/auth.routes")(app);

app.use(authJWT.verifyToken);


//imported category routes
require("./Routes/category.routes")(app);

//import product routess
require("./Routes/product.routes")(app);




require("./Routes/user.routes")(app);
//import User routes 
//require("./Routes/user.routes")(app);



app.listen(process.env.PORT,()=>{
    console.log(`application is running on port ${process.env.PORT}`);
})