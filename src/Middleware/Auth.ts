import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtRandomString } from '../config';

export interface AuthRequest extends Request {
  userId?: string; // Define the userId property
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new Error('Not authenticated.') as any;
    error.statusCode = 401;
    return res.send(error.message);
  }

  const token = authHeader.split(' ')[1];
  let decodedToken: any;

  try {
    decodedToken = jwt.verify(token, jwtRandomString);
  } catch (err:any) {
   
    return res.status(500).send(err.message);
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated.') as any;
    error.statusCode = 401;
    return res.send(error.message);
  }

  req.userId = decodedToken.userId;
  next();
};

export default authMiddleware;