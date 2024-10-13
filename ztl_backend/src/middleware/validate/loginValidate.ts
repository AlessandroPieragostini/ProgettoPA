import { body, query } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

// Validazione dei parametri di input per il login
export const validateLogin = [
  body('email').optional().isEmail().withMessage('Email deve essere un indirizzo valido'),
  query('email').optional().isEmail().withMessage('Email deve essere un indirizzo valido'),
  validateRequest
];