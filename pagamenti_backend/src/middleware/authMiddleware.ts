import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Middleware per autenticare il token JWT
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); 

  // Se non c'è il token, restituisce un errore
  if (!token) {
    return next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Token di accesso mancante')); 
  }

  const secret = process.env.JWT_SECRET;

  // Se il segreto JWT non è definito, restituisce un errore 
  if (!secret) {
    return next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore server: JWT secret non definito')); 
  }

  // Verifica il token JWT
  jwt.verify(token, secret, (err, user) => {
    // Se il token è invalido o scaduto restituisce un errore 
    if (err) {
      return next(ErrorFactory.createError(ErrorTypes.Forbidden, 'Token non valido o scaduto')); 
    }
    req.user = user; 
    next();
  });
};

// Middleware per autorizzare l'accesso in base al ruolo utente
export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    
    // Se il ruolo dell'utente non è presente, restituisce un errore 
    if (!userRole) {
      return next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Ruolo utente mancante')); 
    }

    if (roles.includes(userRole)) {
      next(); 
    } else {
      return next(ErrorFactory.createError(ErrorTypes.Forbidden, 'Accesso negato: ruolo non autorizzato')); 
    }
  };
};
