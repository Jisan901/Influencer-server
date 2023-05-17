const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    photo:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default: "User",
        enum : ["User", "Admin", "Seller"]
    },
    uid:String,
    email_verified:Boolean,
    verified:{
        type:Boolean,
        default:false
    }
});

const User = mongoose.model('User',UserSchema);

module.exports = {
    User,
    UserSchema
}