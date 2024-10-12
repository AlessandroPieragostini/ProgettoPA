import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetTransitoByVarco = [
    param('varcoId').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validateGetTransitoByVeicolo = [
    param('targa').isString().withMessage('Targa deve essere una stringa'),
    validateRequest
];

export const validateGetTransitoById = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validateCreateTransito = [
    body('targaVeicolo').isString().withMessage('La targa deve essere una stringa'),
    body('varcoId').isInt({ min: 1 }).withMessage('Varco ID deve essere un intero positivo'),
    body('dataOraTransito').isISO8601().withMessage('Data Ora deve essere una data valida'),
    validateRequest
];

export const validateUpdateTransito = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('targaVeicolo').optional().isString().withMessage('La targa deve essere una stringa'),
    body('varcoId').optional().isInt({ min: 1 }).withMessage('VarcoId deve essere un intero positivo'),
    body('dataOraTransito').optional().isISO8601().withMessage('Data Ora deve essere una data valida'),
    validateRequest
];

export const validateDeleteTransito = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];