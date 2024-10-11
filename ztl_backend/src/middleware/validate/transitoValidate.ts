import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddlaware';

export const validateHandleTransitoRequests = [
    param('id').optional().isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validateCreateTransito = [
    body('targaVeicolo').isString().withMessage('Veicolo deve essere una stringa'),
    body('varcoId').optional().isInt({ min: 1 }).withMessage('Varco ID deve essere un intero positivo'),
    body('dataOraTransito').optional().isISO8601().withMessage('Data Ora deve essere una data valida'),
    validateRequest
];

export const validateUpdateTransito = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('targaVeicolo').optional().isString().withMessage('Veicolo deve essere una stringa'),
    body('varcoId').optional().isInt({ min: 1 }).withMessage('Varco deve essere un intero positivo'),
    body('dataOraTransito').optional().isISO8601().withMessage('Data Ora deve essere una data valida'),
    validateRequest
];

export const validateDeleteTransito = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];