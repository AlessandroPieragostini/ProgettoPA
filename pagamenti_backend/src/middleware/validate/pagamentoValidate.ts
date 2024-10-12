import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validatePagaMulta = [
  param('uuid').isUUID().withMessage('UUID deve essere un UUID valido'),
  validateRequest
];

export const validateStampaRicevuta = [
  param('uuid').isUUID().withMessage('UUID deve essere un UUID valido'),
  validateRequest
];