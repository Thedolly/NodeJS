
const db = require("../models");
//const CategoryController = require("../controllers/category.controllers")

const Product = db.Product;

const Category = db.Category;

exports.create = (req,res)=>{

    const{name, description, cost, categoryId} = req.body;
    const product = {name, description, cost, categoryId};

    Product.create(product)
    .then(product=>{
        res.status(201).send(product);
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "Something went wrong"});
    })
}

exports.findAll = (req,res)=>{
    Product.findAll()
    .then(products=>{

        if(products==null){
            res.send(400).send({message:"product id is invalid"});
        }
        res.send(products)
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "Something went wrong"});
    })
}

exports.findOne = (req, res)=>{
    const productId = req.params.id;

    Product.findByPk(productId)
    .then(product=>{
        if(!product){
            res.status(404).send({message:"product not found"});
        }
        res.send(product);
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "Something went wrong"});
    })
}

exports.update = (req,res)=>{
    const productId = req.params.id;

    const {name, description, cost, categoryId} = req.body;

    const product ={};

    if(name){
        product.name = name;
    }
    if(description){
        product.description=description;
    }
    if(cost){
        product.cost=cost;
    }
    if(categoryId){
        product.categoryId=categoryId;
    }
    Product.update(product,{
        where:{id:productId}
    })
    .then((updtedProduct)=>{
        res.send({message:`${updtedProduct[0]} records updated successfully`});
    })
    .catch((err)=>{
        res.status(500).send({message:"Something went wrong"});
    })
}

exports.delete = (req,res)=>{
    const productId = req.params.id;

    Product.destroy({
        where:{
            id: productId
        }
    }).then((data)=>{
        res.send({message:"Successfully deleted the category"});
    })
    .catch((err)=>{
        res.status(500).send({message:"Something went wrong"});
    })
}

exports.findProductsUnderCategory = (req,res)=>{

    //that's why here we not using controller
   // CategoryController.getOne(req,res);

        Product.findAll({
            where:{
            categoryId: req.params.categoryId
            }
    })
    .then(products=>{
        res.send(products);
    })
    .catch((err)=>{
        res.status(500).send({message:"Something went wrong while getting products for given category Id"});
       }) 
}

exports.findProductUnderCategory = (req,res)=>{

     Product.findAll({
        where:{
        categoryId:req.params.categoryId,
        id:req.params.productId
        }
    })
    .then(product=>{
        res.send(product);
    })
    .catch((err)=>{
        res.status(500).send({message:"Something went wrong while getting product for given category Id and productId"});
       })
   
}