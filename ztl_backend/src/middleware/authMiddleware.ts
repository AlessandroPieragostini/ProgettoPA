// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).send('Access Denied'); // Non restituire, usa return solo se serve.
    return; // Aggiungi un return per evitare di continuare
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = verified; // Aggiungi i dati dell'utente a req
    next();
  } catch (err) {
    res.status(400).send('Invalid Token'); // Non restituire, usa return solo se serve.
    return; // Aggiungi un return per evitare di continuare
  }
};
