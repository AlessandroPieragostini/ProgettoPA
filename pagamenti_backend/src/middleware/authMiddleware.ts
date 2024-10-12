import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; // Importa la fabbrica degli errori

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); 

  if (!token) {
    return next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Token di accesso mancante')); // Errore 401
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore server: JWT secret non definito')); // Errore 500
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return next(ErrorFactory.createError(ErrorTypes.Forbidden, 'Token non valido o scaduto')); // Errore 403
    }
    req.user = user; // Aggiungi l'utente decodificato alla richiesta
    next();
  });
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    
    if (!userRole) {
      return next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Ruolo utente mancante')); // Errore 401
    }

    if (roles.includes(userRole)) {
      next(); // Permetti l'accesso
    } else {
      return next(ErrorFactory.createError(ErrorTypes.Forbidden, 'Accesso negato: ruolo non autorizzato')); // Errore 403
    }
  };
};
