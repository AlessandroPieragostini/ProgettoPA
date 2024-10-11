import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const ricaricaTokenValidation = [
  param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
  body('tokens').isFloat({ gt: 0 }).withMessage('Importo deve essere un float positivo').toFloat(),
  validateRequest
];

export const pagaMultaValidation = [
  body('uuid').isUUID().withMessage('UUID deve essere un UUID valido'),
  validateRequest
];