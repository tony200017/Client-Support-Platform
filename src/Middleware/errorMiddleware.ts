import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../errors/HTTPError';
// Error handling middleware for validation errors
 const ErrorMiddleware = (
    error:HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error as HTTPError ) {
        return res.status(error.statusCode || 500).send(error.message || 'Internal Server Error');
      }else{
        return res.status(500).send('unexpected error'); 
    }
  };

  export default ErrorMiddleware;