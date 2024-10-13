import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

// Middleware per validare i campi della richiesta di ricarica del credito
export const validateRicaricaCredito = [
    body('userId').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    
    body('importoRicarica').isFloat({ gt: 0 }).withMessage('Importo deve essere un float positivo').toFloat(),
    
    validateRequest
];
