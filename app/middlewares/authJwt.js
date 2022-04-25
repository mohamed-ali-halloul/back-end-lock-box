const jwt = require('jsonwebtoken');
const config =require("../../config/auth");

verifyToken= (req,res,next)=>{
let token= req.headers["authorization"];
// const token = req.headers.authorization.split(' ')[1];

if(!token){
    return res.status(403).send({message : "no token provided!"});
}
jwt.verify(token, config.secret,(err,decoded)=>{
    console.log(token);
    console.log(config.secret);
    if(err){
        console.log(err);
        return res.status(401).send({
            message:"unauthorized!"
        });
    }
    req.userId = decoded.id;
    console.log('req.userId', req.userId,"decoded.id",decoded.id)
    next();
});
}
const authJwt = {
    verifyToken :verifyToken
};
module.exports=authJwt; 