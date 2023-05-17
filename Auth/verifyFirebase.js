const admin = require("firebase-admin");

const {User} = require("../Schemes/User.js");


// firebase admin useGetJwt(IdToken)

const serviceAccount = require("../influencer-gear-firebase-adminsdk-d4ros-0dc1381144.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// end firebase-admin

function verifyUser(req,res,next){
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({message:'unauthorized access'})
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({message:'unauthorized access'})
    }
    admin.auth().verifyIdToken(token)
    .then(decoded => {
        req.decoded=decoded;
        return next()
    })
    .catch(err=>{
        res.status(401).send({message:'unauthorized access'})
    })
}

const verifyUserIn = async(req,res,next)=>{
    const result = await User.findOne({email:req.decoded.email})
    if (!result?.uid) {
        return res.status(401).send({message:"unauthorized"})
    }
    next()
}


const getCredential = async(token)=>{
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded;
}

module.exports = {
    getCredential,
    verifyUser,
    verifyUserIn
}