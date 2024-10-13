import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

// Validazione per ottenere un varco tramite ID
export const validateGetVarco = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

// Validazione per creare un nuovo varco
export const validateCreateVarco = [
    body('location').isString().withMessage('Location deve essere una stringa'),
    body('ztlId').isInt({ min: 1 }).withMessage('ZTL ID deve essere un intero positivo'),
    validateRequest
];

// Validazione per aggiornare un varco esistente
export const validateUpdateVarco = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('location').optional().isString().withMessage('Location deve essere una stringa'),
    body('ztlId').optional().isInt({ min: 1 }).withMessage('ZTL ID deve essere un intero positivo'),
    validateRequest
];

// Validazione per eliminare un varco tramite ID
export const validateDeleteVarco = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];
