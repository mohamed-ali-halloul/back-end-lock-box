const joi =require('joi')
function boxValidation(body){
const boxValdiationSchema = joi.object({
    ref : joi.string().min(5).max(30).required(),
    name  : joi.string().min(3).max(20).required(),
    idsize: joi.required(),
    status:joi.string(),
    code:joi.string(),
    availibility:joi.integer(),
    boardId:joi.string().required(),
    doorNumber:joi.string().required(), 
    idcabine  : joi.required()
})
    return boxValdiationSchema.validate(body)
}
module.exports = boxValidation;