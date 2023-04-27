import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    } else {
        return res.status(400).json({
            errors: errors.array().map((each => each.msg))
        })
    }
}

export const postExpressValidator =
    [
        check('author', 'author is missing').notEmpty().isString(),
        check('title', 'title not added').notEmpty().isString(),
        check('body', 'body is not added').notEmpty().isString(),
        validate
    ]


export const paramsValidator1 = [
    check('id', 'Invalid id').notEmpty().isMongoId(),
    check('author', 'author not provided').notEmpty().isString(),
    check('title', 'title is missing').notEmpty().isString(),
    check('body', 'body is missing').notEmpty().isString(),
    validate
]


export const combineValidate = () => {
    return [
        ...postExpressValidator,
        validate
    ]
}

export const paramsValidator = () => [
    paramsValidator1,
    validate
]