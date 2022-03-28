const joi = require('joi')
function tarifValidation(body){
const tarifValidationSchema = joi.object({
    duration : joi.string().required(),
    price: joi.integer().required(),
    date_debut : joi.date().required(),
    display: joi.integer().required(),
    idsize: joi.integer().required()
})
return tarifValidationSchema.validate(body)
}
module.exports = tarifValidation;