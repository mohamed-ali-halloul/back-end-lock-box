const db=require("../models");
const Size = db.sizes;
const Op = db.Sequelize.Op;
exports.getAll=(req,res)=>
{
Size.findAll({attributes : {exclude : ["createdAt","updatedAt"]}})
.then(sizes =>{res.status(200).json(sizes)})
.catch(error => {
      
    res.status(500).json(error)
  });

} 
exports.getOne= (req,res)=>{
    const {id} = req.params
    Size.findByPk(id)
    .then(size =>{
        if(!size) return res.status(404).json({msg :"not found"})
        res.status(200).json(size)
    })
}