import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; 

// Middleware per autenticare il token JWT
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Token di accesso mancante')); 
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore server: JWT secret non definito'));
  }

   // Verifica la validità del token JWT
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return next(ErrorFactory.createError(ErrorTypes.Forbidden, 'Token non valido o scaduto')); 
    }
    req.user = user; 
    next();
  });
};

// Middleware per autorizzare l'accesso in base al ruolo dell'utente
export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    
    if (!userRole) {
      return next(ErrorFactory.createError(ErrorTypes.Forbidden, 'Ruolo utente mancante'));
    }

    // Verifica se il ruolo dell'utente è autorizzato
    if (roles.includes(userRole)) {
      next();
    } else {
      return next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Accesso negato: ruolo non autorizzato')); 
    }
  };
};
