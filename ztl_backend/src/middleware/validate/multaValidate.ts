import { param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateCheckMulteRequests = [
    param('id').optional().isInt({ min: 1 }).withMessage('ID deve essere un numero intero'),
    validateRequest
];

export const validateBollettinoRequests = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un numero intero'),
    validateRequest
];