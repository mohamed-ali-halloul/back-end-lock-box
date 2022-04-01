const db = require("../models");
const Box = db.boxes;
const Op = db.Sequelize.Op;

exports.send=(req,res)=>{
    const {id, code}=req.params
    Box.findByPk(id)
    .then(box =>{
        if(!box) return res.status(404).json({msg :"not found"})
        box.set ({
            code:  code
        })
        box.save();

        res.status(200).json(box)})
       
}