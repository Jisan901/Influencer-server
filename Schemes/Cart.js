const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    uid:{
        type:String,
        required: true
    },
    products:[{ pid:{
        type:String,
        required:true
    }, price:{
        type:Number,
        required:true
    } }],
    completed:{
        type:Boolean,
        default:false
    },
});

const Cart = mongoose.model('Cart',CartSchema);

module.exports = {
    Cart,
    CartSchema
}