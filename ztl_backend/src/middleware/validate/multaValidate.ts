import { param } from 'express-validator';
import validateRequest from './validateRequestMiddlaware';

export const validateHandleMulteRequests = [
    param('uuid').optional().isUUID().withMessage('UUID deve essere un UUID valido'),
    validateRequest
];