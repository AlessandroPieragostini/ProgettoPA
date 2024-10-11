import { param, body } from 'express-validator';
import validateRequest from './validateRequestMiddlaware';

export const validateHandleWhitelistRequests = [
    param('id').optional().isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validateCreateWhitelist = [
    body('targaVeicolo').isString().withMessage('Targa Veicolo deve essere una stringa'),
    body('dataScadenza').optional().isISO8601().withMessage('Data Scadenza deve essere una data valida o non nulla'),
    validateRequest
];

export const validateUpdateWhitelist = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('targaVeicolo').optional().isString().withMessage('Targa Veicolo deve essere una stringa'),
    body('dataScadenza').optional().isISO8601().withMessage('Data Scadenza deve essere una data valida o non nulla'),
    validateRequest
];

export const validateDeleteWhitelist = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];
