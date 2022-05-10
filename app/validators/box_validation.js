const joi =require('joi')
function boxValidation(body){
const boxValdiationSchema = joi.object({
    name  : joi.string().min(1).required(),
    idsize: joi.required(),
    status:joi.string().valid('WORKING','OUT_OF_SERVICE'),
    // code:joi.string().min(4).max(4),
    availibility:joi.number().integer().min(0).max(1).required(),
    boardID:joi.string().required(),
    doorNumber:joi.string().required(), 
    idcabine  : joi.required(),
   ref: joi.string()

})
const boxValidationUpdate=joi.object({
    name  : joi.string().min(1).required(),
    // idsize: joi.required(),
    status:joi.string().valid('WORKING','OUT_OF_SERVICE'),
    code:joi.string().min(4).max(4),
    availibility:joi.number().integer().min(0).max(1).required(),
    boardID:joi.string().required(),
    doorNumber:joi.string().required(), 
    // idcabine  : joi.required(),
   ref: joi.string()

})
    return{ boxValdiationSchema: boxValdiationSchema.validate(body),
            boxValidationUpdate: boxValidationUpdate.validate(body)
    }
    }
module.exports = boxValidation;