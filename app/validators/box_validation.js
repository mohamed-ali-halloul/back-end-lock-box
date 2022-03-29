const joi =require('joi')
function boxValidation(body){
const boxValdiationSchema = joi.object({
    name  : joi.string().min(3).max(20).required(),
    idsize: joi.required(),
    status:joi.string(),
    code:joi.string(),
    availibility:joi.number().integer().required(),
    boardId:joi.string().required(),
    doorNumber:joi.string().required(), 
    idcabine  : joi.required(),
   ref: joi.string()

})
    return boxValdiationSchema.validate(body)
}
module.exports = boxValidation;