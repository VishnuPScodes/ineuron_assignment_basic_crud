import { ErrorRequestHandler } from 'express';

export const errorHandler :ErrorRequestHandler = (err: Error, req: any, res: any, next: any) => {
  res.status(500).send('Something broke!');
};
