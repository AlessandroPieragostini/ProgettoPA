import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assume che il token sia passato nell'header Authorization

  if (!token) {
    res.sendStatus(403); // Forbidden
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (err: any, user: any) => {
    if (err) {
      res.sendStatus(403); // Forbidden
      return;
    }
    req.user = user; // Aggiunge l'utente alla richiesta
    next();
  });
};
