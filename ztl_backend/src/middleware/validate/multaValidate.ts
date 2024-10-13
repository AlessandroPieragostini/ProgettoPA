import { param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

// Validazione per le richieste di verifica delle multe
export const validateCheckMulte = [
    param('id').optional().isInt({ min: 1 }).withMessage('ID deve essere un numero intero'),
    validateRequest
];

// Validazione per le richieste di bollettino
export const validateBollettino = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un numero intero'),
    validateRequest
];