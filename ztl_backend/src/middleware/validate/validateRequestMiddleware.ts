import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, ErrorTypes } from '../../utils/errorFactory';

// Middleware per validare le richieste
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req); 
  
  if (!errors.isEmpty()) {
    return next(ErrorFactory.createError(ErrorTypes.BadRequest, 
        'Errore di validazione: ' + errors.array().map(e => e.msg).join(', '))); 
  }
  next();
};

export default validateRequest;
