const db = require("../models");
const Cabine = db.cabines;
const cabineValidation = require("../validators/cabine_validation");
exports.create= (req,res)=>{
    const {body}=req 
    const{error}=cabineValidation(body)
    if(error) return res.status(401).json(error.details[0].message)
     
    Cabine.create({... body})
    .then(()=>{
        res.status(201).json({msg:"creation du box"})
    })
    .catch(error =>{
        res.status(500).json(error)
    });
}
exports.getAll=(req,res)=>
{
Cabine.findAll({attributes : {exclude : ["createdAt","updatedAt"]}})
.then(cabines =>{res.status(200).json(cabines)})
.catch(error => {
      
    res.status(500).json(error)
  });

} 
exports.getOne= (req,res)=>{
    const {id} = req.params
    Cabine.findByPk(id)
    .then(cabine =>{
        if(!cabine) return res.status(404).json({msg :"not found"})
        res.status(200).json(cabine)
    })
}
exports.deleteOne =(req,res)=> {
    const {id} = req.params
Cabine.destroy({where : {id :id}})
.then(ressource => {
    if(ressource === 0) return res.status(404).json({msg:"not found"})
    res.status(200).json({msg :"Deleted Resource"})
})
.catch((error)=> res.status(500).json(error));
};

exports.deleteAll=(req,res)=>{
    Cabine.destroy({
        where:{},
        truncate: false
    })
    .then(nums=>{
        res.send({ message: `${nums}Cabines were deleted successfully!` });
      })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Cabines."
        });
      });
};




exports.update = (req,res) => {
    const {id} = req.params

    const {body} =req ;
Cabine.findByPk(id)
.then(cabine => {
    if(!cabine) return res.status(404).json({msg :"not found"})  
cabine.name = body.name
cabine.id=body.id
cabine.ref=body.ref
cabine.network_type= body.network_type
cabine.mode= body.mode
cabine.shortLink = body.shortLink
cabine.save()
.then(()=> res.status(201).json({msg:"updated ressource"}))
.catch((error)=> res.status(500).json(error));

})
.catch((error)=> res.status(500).json(error));
}