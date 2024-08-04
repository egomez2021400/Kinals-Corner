const {validationResult} = require("express-validator");

const validateParams = async (req, res, next)=>{  // Expres-validator para la validacion en general
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            ok: false,
            errors: errors.mapped(),
        })
    }
    next();
}

module.exports = {validateParams};