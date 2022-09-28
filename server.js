const express = require("express");
const config = require("./configs/db.config"); 
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

const db = require("./models");
// const products = db.products;

db.sequelize.sync({force:false})
.then(()=>{
    console.log("db synced");
})

require("./Routes/category.routes")(app)


app.listen(process.env.PORT,()=>{
    console.log(`application is running on port ${process.env.PORT}`);
})