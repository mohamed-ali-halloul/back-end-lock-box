const joi =require('joi')
function boxValidation(body){
const boxValdiationSchema = joi.object({
    ref : joi.string().min(5).max(30).required(),
    name  : joi.string().min(3).max(20).required(),
    size  : joi.string().valid().required(),
    price : joi.number().required(),
    idcabine  : joi.required()
})
    return boxValdiationSchema.validate(body)
}
module.exports = boxValidation;