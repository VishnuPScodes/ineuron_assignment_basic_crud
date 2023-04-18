import { NextFunction, Request, Response } from 'express';
import { body ,param,validationResult } from 'express-validator';

export const postExpressValidator=()=>{
    return (
        [
        body('author').notEmpty().isString(),
        body('title').notEmpty().isString(),
        body('body').notEmpty().isString()
        ]
    )
}

export const paramsValidator=()=>{
    return (
        param('id').notEmpty().isMongoId()
    )
}

export const validate=(req:Request,res:Response,next:NextFunction)=>{
    const errors=validationResult(req);
    if(errors.isEmpty()){
        return next()
    }
    else{
        const extractedErrors=[];
        errors.array().map((er)=>{extractedErrors.push({ [er.param]: er.msg })});
         return res.status(400).send({errors:extractedErrors});
    }
}
