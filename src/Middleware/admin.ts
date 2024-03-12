// Middleware to check if the user is an admin
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from "./Auth";
import { userById } from '../user/user.service';
const adminMiddleware =async (req: AuthRequest, res: Response, next: NextFunction) => {
   const user = await userById(req.userId as string);
    if (!user.isAdmin) {
      const error = new Error('Unauthorized.') as any;
      error.statusCode = 403;
      return res.send(error.message);
    }
    next();
  };

  export default adminMiddleware;