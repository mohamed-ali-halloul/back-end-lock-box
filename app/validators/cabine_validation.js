const joi =require('joi')
function cabineValidation(body){
const cabineValdiationSchema = joi.object({
    ref : joi.string().min(3).max(30).required(),
    name  : joi.string().min(3).max(20).required(),
})
    return cabineValdiationSchema.validate(body)
}
module.exports = cabineValidation;