import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validatePagaMulta = [
  param('uuidPagamento').isUUID(4).withMessage('UUID deve essere un UUID valido'),
  validateRequest
];

export const validateStampaRicevuta = [
  param('uuidPagamento').isUUID(4).withMessage('UUID deve essere un UUID valido'),
  validateRequest
];