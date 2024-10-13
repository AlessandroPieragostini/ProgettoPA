import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

// Middleware per validare la richiesta di pagamento di una  multa
export const validatePagaMulta = [
  param('uuidPagamento').isUUID(4).withMessage('UUID deve essere un UUID valido'),
  
  validateRequest
];

// Middleware per validare la richiesta di stampa di una ricevuta
export const validateStampaRicevuta = [
  param('uuidPagamento').isUUID(4).withMessage('UUID deve essere un UUID valido'),
  
  validateRequest
];
