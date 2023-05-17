const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    uid:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    star:{
        type:Number,
        default:0
    }
});

const Product = mongoose.model('Product',ProductSchema);

module.exports = {
    Product,
    ProductSchema
}