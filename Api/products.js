const express = require("express");
const {Product} = require("../Schemes/Product.js");
const {verifyUser,verifyUserIn} = require("../Auth/verifyFirebase.js");
const {ObjectId} = require("mongodb");

const route = express.Router();



route.get('/:id',(req,res)=>{
    res.send({prod:req.params.id})
})

route.get('/',async(req,res)=>{
    const {limit,page:pageNumber} = req.query
    const products=await Product.find({}).skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * limit ) : 0 ).limit(limit)
    res.send(products)
})

route.post('/',verifyUser,verifyUserIn,async(req,res)=>{
    const {name,price,desc,phone,url} = req.body;
    const product = new Product({
        uid:req.decoded.uid,
        name,
        desc,
        price,
        image:url,
        phone
    });
    result=await product.save()
    res.send(result)
})

route.patch('/',(req,res)=>{
    res.send({prod:""})
})

route.delete('/:id',verifyUser,verifyUserIn,async(req,res)=>{
    try{
    const result = await Product.deleteOne({_id:new ObjectId(req.params.id)})
    return res.send(result)
    console.log(result);
    }
    catch(err){
        res.status(503).send(err)
        console.log(err);
    }
})


module.exports=route;