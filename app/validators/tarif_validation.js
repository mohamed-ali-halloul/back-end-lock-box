const joi = require('joi')
function tarifValidation(body){
const tarifValidationSchema = joi.object({
    duration : joi.string().required(),
    price: joi.number().integer().required(),
    date_debut : joi.date().required(),
    display: joi.number().integer().min(0).max(1).required(),
    idsize: joi.number().integer().required()
})
return tarifValidationSchema.validate(body)
}
module.exports = tarifValidation;