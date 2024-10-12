import { param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateHandleMulteRequests = [
    param('uuid').optional().isUUID().withMessage('UUID deve essere un UUID valido'),
    validateRequest
];