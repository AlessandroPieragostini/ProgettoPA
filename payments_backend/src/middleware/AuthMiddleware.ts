import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
   const token = req.headers.authorization?.split(' ')[1];
   if (!token) {
      return res.status(401).json({ error: 'Token missing' });
   }

   jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
         return res.status(403).json({ error: 'Invalid token' });
      }
      req.user = decoded;  
      next();
   });
};
