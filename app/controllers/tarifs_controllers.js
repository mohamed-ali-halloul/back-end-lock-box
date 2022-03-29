const db = require("../models");
const Tarif = db.tarifs;
const Op = db.Sequelize.Op;
const tarifValidation =require ("../validators/tarif_validation")

exports.create= (req,res)=>{
    const {body}=req 
    const{error}=tarifValidation(body)
    if(error) return res.status(401).json(error.details[0].message)
     
    Tarif.create({... body})
   
    .then(()=>{
        res.status(201).json({msg:"creation du tarif"})
    })
    .catch(error =>{
        res.status(500).json(error)
    });
}
exports.getAll=(req,res)=>
{
Tarif.findAll({attributes : {exclude : ["createdAt","updatedAt"]}})
.then(tarifs =>{res.status(200).json(tarifs)})
.catch(error => {
      
    res.status(500).json(error)
  });

} 
exports.getOne= (req,res)=>{
    const {id} = req.params
    Tarif.findByPk(id)
    .then(tarif =>{
        if(!tarif) return res.status(404).json({msg :"not found"})
        res.status(200).json(tarif)
    })
}
exports.deleteOne =(req,res)=> {
    const {id} = req.params
Tarif.destroy({where : {id :id}})
.then(ressource => {
    if(ressource === 0) return res.status(404).json({msg:"not found"})
    res.status(200).json({msg :"Deleted Resource"})
})
.catch((error)=> res.status(500).json(error));
}
exports.deleteAll=(req,res)=>{
    Tarif.destroy({
        where:{},
        truncate: false
    })
    .then(nums=>{
        res.send({ message: `${nums}Tarifs were deleted successfully!` });
      })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Tarifs."
        });
      });
};
exports.update = (req,res) => {
    const {id} = req.params

    const {body} =req ;
Tarif.findByPk(id)
.then(tarif => {
    if(!tarif) return res.status(404).json({msg :"not found"})  
tarif.duration = body.duration
tarif.price=body.price
tarif.id=body.id
tarif.display = body.display
tarif.date_debut = body.date_debut
tarif.save()
.then(()=> res.status(201).json({msg:"updated ressource"}))
.catch((error)=> res.status(500).json(error));

})
.catch((error)=> res.status(500).json(error));
}
  
