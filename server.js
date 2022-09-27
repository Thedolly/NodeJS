const express = require("express");
const config = require("./configs/db.config"); 


const app = express();

const db = require("./models");
// const products = db.products;

db.sequelize.sync({force:false})
.then(()=>{
    console.log("db synced");
})


app.listen(process.env.PORT,()=>{
    console.log("application is running on port 8000");
})