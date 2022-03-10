const joi =require('joi')
function userValidation(body){

const userValidationSchema =joi.object({
    username: joi.string().min(3).max(30).required(),
    email : joi.string().email().trim().required(),   
    password: joi.string().min(8).required(),
    role : joi.string().valid()

}) 
const userValidationLogin = joi.object({
    email : joi.string().email().trim().required(),   
    password: joi.string().min(8).required(),

})

return {
    userValidationSchema : userValidationSchema.validate(body),
    userValidationLogin : userValidationLogin.validate(body)
}

}
module.exports = userValidation