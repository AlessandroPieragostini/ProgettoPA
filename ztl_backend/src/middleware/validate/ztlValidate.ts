import { param, body } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validateCreateZtl = [
    body('nome').isString().withMessage('Nome deve essere una stringa'),
    body('descrizione').optional().isString().withMessage('Descrizione deve essere una stringa'),
    body('orarioInizio').isString().withMessage('Orario Inizio deve essere una stringa (formato HH:MM)'),
    body('orarioFine').isString().withMessage('Orario Fine deve essere una stringa (formato HH:MM)'),
    body('giorniAttivi').isArray().withMessage('Giorni Attivi deve essere un array'),
    body('giorniAttivi.*').isString().withMessage('Ogni elemento di Giorni Attivi deve essere una stringa'),
    validateRequest
];

export const validateUpdateZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('nome').optional().isString().withMessage('Nome deve essere una stringa'),
    body('descrizione').optional().isString().withMessage('Descrizione deve essere una stringa'),
    body('orarioInizio').optional().isString().withMessage('Orario Inizio deve essere una stringa (formato HH:MM)'),
    body('orarioFine').optional().isString().withMessage('Orario Fine deve essere una stringa (formato HH:MM)'),
    body('giorniAttivi').optional().isArray().withMessage('Giorni Attivi deve essere un array'),
    body('giorniAttivi.*').isString().withMessage('Ogni elemento di Giorni Attivi deve essere una stringa'),
    validateRequest
];

export const validateDeleteZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];
