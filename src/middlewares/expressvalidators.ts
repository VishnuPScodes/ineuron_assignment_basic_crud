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

export const paramsValidator1=()=>[
    param('id').notEmpty().isMongoId(),
    body('author').notEmpty().isString(),
    body('title').notEmpty().isString(),
    body('body').notEmpty().isString()
]

export const validate=(req:Request,res:Response,next:NextFunction)=>{
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    } else {
        return res.status(400).json({
            bodyValidationErrors: errors.array({ onlyFirstError: true })
        })
    }
}

export const combineValidate=()=>{
    return [
        ...postExpressValidator(),
        validate
    ]
}
export const paramsValidator=()=>[
    ...paramsValidator1(),
    validate
]