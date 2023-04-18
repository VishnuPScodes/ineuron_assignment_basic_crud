import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const errorHandler :ErrorRequestHandler = (err: Error, req: Request, res: Response, next:NextFunction ) => {
  res.status(500).send('Something broke!');
};
