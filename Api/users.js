const express = require("express");
const {getCredential,verifyUser} = require("../Auth/verifyFirebase.js");
const {User} = require("../Schemes/User.js");

const route = express.Router();

// [todo] : block [A] all user on database admin only

route.get('/',async(req,res)=>{
    const users = await User.find({});
    res.send(users)
})

// [todo] : block [B] get user from database

route.get('/:email',verifyUser,async(req,res)=>{
    try {
        if(req.decoded.email===req.params.email){
            const user = await User.findOne({email:req.params.email})
            return res.send(user)
        }
        else{
            return res.status(401).send({message:"unauthorized access"})
        }
    } catch (e) {
        res.status(503).send(e)
    }
})

// [todo] : block [C] updating user on database -  canceled

route.patch('/',(req,res)=>{
    res.send({user:"403"})
})

// [todo] : block [D] updating role of user by admin on database

route.patch('/role',async(req,res)=>{
    const {email,type}=req.body
    const result = await User.updateOne({email},{$set:{
        role:type,
        isAdmin:type==="Admin"
    }})
    res.send(result)
})

// [todo] : block [E] delete user on database

route.delete('/:email',verifyUser,async(req,res)=>{
    try {
        if(req.decoded.email===req.params.email){
            const result = await User.deleteOne({email:req.params.email})
            return res.send(result)
        }
        else{
            return res.status(401).send({message:"unauthorized access"})
        }
    } catch (e) {
        res.status(503).send(e)
    }
})


// [todo] : block [F] saving user on database


route.post('/authorize',async(req,res)=>{
    try{
        // [TODO]: decode firebase jwt - done
        
        const {name,email,picture,uid,email_verified} = await getCredential(req.body.token.split(' ')[1])
        
        // checking for existing user
        
        const oldUser = await User.findOne({email});
        if (oldUser?.email) {
            return res.send({oldUser})
        }
        
        // block [B] : save and handling errors :)
        const user = new User({
            name,
            email,
            uid,
            photo:picture,
            email_verified
        })
        const result = await user.save()
        res.send(result)
        // block [B]
    }
    
    catch(error){
        res.status(503).send(error)
    }
})




module.exports=route;