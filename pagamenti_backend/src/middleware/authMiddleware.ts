// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
   } // Unauthorized

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).send('Server error: JWT secret is not defined.');
    return;
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user; // Aggiungi l'utente decodificato alla richiesta
    next();
  });
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user.role;
    if (roles.includes(userRole)) {
      next(); // Permetti l'accesso
    } else {
      res.sendStatus(403); // Forbidden
    }
  };
};
