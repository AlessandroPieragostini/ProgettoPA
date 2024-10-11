import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddlaware';

export const validateHandleVarcoZtlRequests = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validateCreateVarcoZtl = [
    body('location').optional().isString().withMessage('Location deve essere una stringa'),
    body('zona_ztl').isInt({ min: 1 }).withMessage('ZTL ID deve essere un intero positivo'),
    validateRequest
];

export const validateUpdateVarcoZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('location').optional().isString().withMessage('Location deve essere una stringa'),
    body('ztlId').optional().isInt({ min: 1 }).withMessage('ZTL ID deve essere un intero positivo'),
    validateRequest
];


export const validateDeleteVarcoZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];