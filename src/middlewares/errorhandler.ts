import { ErrorRequestHandler, Request, Response } from 'express';

export const errorHandler :ErrorRequestHandler = (err: Error, req: Request, res: Response, next: any) => {
  res.status(500).send('Something broke!');
};
