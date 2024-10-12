import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetVarco = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validateCreateVarco = [
    body('location').isString().withMessage('Location deve essere una stringa'),
    body('ztlId').isInt({ min: 1 }).withMessage('ZTL ID deve essere un intero positivo'),
    validateRequest
];

export const validateUpdateVarco = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('location').optional().isString().withMessage('Location deve essere una stringa'),
    body('ztlId').optional().isInt({ min: 1 }).withMessage('ZTL ID deve essere un intero positivo'),
    validateRequest
];


export const validateDeleteVarco = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];