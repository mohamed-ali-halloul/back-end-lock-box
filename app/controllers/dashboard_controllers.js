const db =require("../models");
const Box = db.box;
const Cabine= db.cabine;

exports.cabineAvailable=(req,res)=>{
    const {id}=req.params;
    const num=0;
    Box.findByPk(id)
    

}