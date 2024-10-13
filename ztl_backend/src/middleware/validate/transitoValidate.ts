import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

// Validazione per ottenere transiti per ID del varco
export const validateGetTransitoByVarco = [
    param('varcoId').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

// Validazione per ottenere transiti tramite targa veicolo
export const validateGetTransitoByVeicolo = [
    param('targa').isString().withMessage('Targa deve essere una stringa'),
    validateRequest
];

// Validazione per ottenere un transito tramite ID
export const validateGetTransitoById = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

// Validazione per creare un nuovo transito
export const validateCreateTransito = [
    body('targa').isString().withMessage('La targa deve essere una stringa'),
    body('varcoId').isInt({ min: 1 }).withMessage('Varco ID deve essere un intero positivo'),
    body('dataOraTransito').isISO8601().withMessage('Data Ora deve essere una data valida'),
    validateRequest
];

// Validazione per aggiornare un transito esistente
export const validateUpdateTransito = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('targa').optional().isString().withMessage('La targa deve essere una stringa'),
    body('varcoId').optional().isInt({ min: 1 }).withMessage('VarcoId deve essere un intero positivo'),
    body('dataOraTransito').optional().isISO8601().withMessage('Data Ora deve essere una data valida'),
    validateRequest
];

// Validazione per eliminare un transito tramite ID
export const validateDeleteTransito = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];
