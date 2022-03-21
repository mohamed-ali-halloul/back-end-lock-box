const bcrypt=require("bcrypt");
const db =require("../models");
const user = require("../models/user");
const User =db.users;
const jwt =require('jsonwebtoken');
const Op = db.Sequelize.Op;
const userValidation =require('../validators/user_validation')
const config =require("../../config/auth");

exports.inscription = (req,res)=> {
const {body} = req
const {error} = userValidation(body).userValidationSchema
if(error) return res.status(401).json(error.details[0].message)
bcrypt.hash(body.password, 10)
.then(hash => {
    if(!hash)return res.status(500).json({msg:"seveur error"})
    
    delete body.password
    new User({...body, password : hash})
    .save()
    .then((user)=>{
        console.log(user)
        res.status(201).json({msg:"user created"})
    })
    .catch((error)=> res.status(500).json(error))
    
})
.catch((error)=> res.status(500).json(error))

}
exports.connexion = (req,res)=> {
    const {email, password} = req.body 
    const {error} =userValidation(req.body).userValidationLogin
    if(error) return res.status(401).json(error.details[0].message)
    
    console.log(email);
    
    // chercher user dans BD
    User.findOne({ where: { email: email } })
    .then(user => {
        if(!user) return res.status(404).json({msg:"user not found"})
        //verifier mdp
        console.log(user);
        bcrypt.compare(password, user.password)
        .then(match => {
            console.log(match);
            if(!match) return res.status(500).json({ msg :"server ,jgError" })
            res.status(200).json({
                email : user.email,
                username: user.username,
                id : user.id,
                token : jwt.sign({id: user.id},"lockbox-secret-key", {expiresIn : "12h"}, config.secret)
               // token : jwt.sign({id: user._id}, 'secret', {expiresIn : '24h'}, config.secret)
              
            })
    
        })
        .catch(error => res.status(500).json(error))
    
    })
   .catch(error => res.status(500).json(error))
    
    }
    
    

exports.create =async (req, res)=>
{

const {body}=req 
const {error}= userValidation(body)
if(error) return res.status(401).json(error.details[0].message)



User.create({... body})
.then(()=>{
    res.status(201).json({msg:"Creation user"})
  })
  
.catch(error =>res.status(500).json(error));
}

exports.getAll=(req,res)=>
{
User.findAll({attributes : {exclude : ["createdAt","updatedAt"]}})
.then(users =>{res.status(200).json(users)})
.catch(error => {
      
    res.status(500).json(error)
  });

} 
exports.getOne= (req,res)=>{
    const {id} = req.params
    User.findByPk(id)
    .then(user =>{
        if(!user) return res.status(404).json({msg :"not found"})
        res.status(200).json(user)
    })
}
exports.deleteOne =(req,res)=> {
    const {id} = req.params
User.destroy({where : {id :id}})
.then(ressource => {
    if(ressource === 0) return res.status(404).json({msg:"not found"})
    res.status(200).json({msg :"Deleted Resource"})
})
.catch((error)=> res.status(500).json(error));
}

exports.update = (req,res) => {
    const {id} = req.params

    const {body} =req ;
User.findByPk(id)
.then(user => {
    if(!user) return res.status(404).json({msg :"not found"})  
user.username = body.username
user.email = body.email
user.password = body.password
user.role = body.role
user.save()
.then(()=> res.status(201).json({msg:"updated ressource"}))
.catch((error)=> res.status(500).json(error));

})
.catch((error)=> res.status(500).json(error));
}
  
// exports.update=(req,res)=>{
//     User.findByPk(id);
//     if(user){
//         user.name = req.body.username || user.username;
//         user.email = req.body.email || user.email;
//         if(req.body.password){
//             user.password = req.body.password;
//         }
//         const updatedUser =  user.save();
//         res.json({
//             id: updatedUser.id,
//             username: updatedUser.username,
//             email: updatedUser.email,
//             token: generateToken(updatedUser.id),
//           });
 
//     } else{
//         res.status(404);
//         throw new Error("user not found");
//     }
// }