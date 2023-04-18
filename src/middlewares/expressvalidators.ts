import { body ,validationResult } from 'express-validator';

export const postExpressValidator=()=>{
    return (
        [
        body('author').notEmpty(),
        body('title').notEmpty(),
        body('body').notEmpty()
        ]
    )
}

export const validate=(req,res,next)=>{
    const errors=validationResult(req);
    if(errors.isEmpty()){
        return next()
    }
    else{
        const extractedErrors=[];
        errors.array().map((er)=>{extractedErrors.push({ [er.param]: er.msg })});
         return res.status(500).send({errors:extractedErrors});
    }
}
