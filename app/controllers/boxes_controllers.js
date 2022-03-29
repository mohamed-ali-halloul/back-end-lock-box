const db = require("../models");
const Box = db.boxes;
const Op = db.Sequelize.Op;
const boxValidation =require ("../validators/box_validation")

exports.create= (req,res)=>{
    const {body}=req 
    console.log(body);
    const{error}=boxValidation(body)
   
    if(error) return res.status(401).json(error.details[0].message)
     
    Box.create({... body})
   
    .then(()=>{
        res.status(201).json({msg:"creation du box"})
    })
    .catch(error =>{
        res.status(500).json(error)
    });
}
exports.getAll=(req,res)=>
{
Box.findAll({attributes : {exclude : ["createdAt","updatedAt"]}})
.then(boxes =>{res.status(200).json(boxes)})
.catch(error => {
      
    res.status(500).json(error)
  });

} 
exports.getOne= (req,res)=>{
    const {id} = req.params
    Box.findByPk(id)
    .then(box =>{
        if(!box) return res.status(404).json({msg :"not found"})
        res.status(200).json(box)
    })
}
exports.deleteOne =(req,res)=> {
    const {id} = req.params
Box.destroy({where : {id :id}})
.then(ressource => {
    if(ressource === 0) return res.status(404).json({msg:"not found"})
    res.status(200).json({msg :"Deleted Resource"})
})
.catch((error)=> res.status(500).json(error));
}
exports.deleteAll=(req,res)=>{
    Box.destroy({
        where:{},
        truncate: false
    })
    .then(nums=>{
        res.send({ message: `${nums}Boxes were deleted successfully!` });
      })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Boxes."
        });
      });
};
exports.update = (req,res) => {
    const {id} = req.params

    const {body} =req ;
Box.findByPk(id)
.then(box => {
    if(!box) return res.status(404).json({msg :"not found"})  
box.name = body.name
box.ref=body.ref
box.id=body.id
box.status=body.status
box.code=body.code
box.availibility= body.availibility
box.boardId= body.boardId
box.doorNumber= body.doorNumber
box.save()
.then(()=> res.status(201).json({msg:"updated ressource"}))
.catch((error)=> res.status(500).json(error));

})
.catch((error)=> res.status(500).json(error));
}
  
