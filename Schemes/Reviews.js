const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    uid:{
        type:String,
        required: true
    },
    pid:{
        type:String,
        required: true
    },
    desc:{
        type:String,
        required:true
    },
    star:{
        type:Number,
        required:true
    }
});

const Review = mongoose.model('Review',ReviewSchema);

module.exports = {
    Review,
    ReviewSchema
}