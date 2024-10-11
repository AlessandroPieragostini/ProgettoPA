import { param, body } from 'express-validator';
import validateRequest from './validateRequestMiddlaware';

export const validateHandleZonaZtlRequests = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validateCreateZonaZtl = [
    body('nome').isString().withMessage('Nome deve essere una stringa'),
    body('descrizione').optional().isString().withMessage('Descrizione deve essere una stringa'),
    body('orarioInizio').isString().withMessage('Orario Inizio deve essere una stringa (formato HH:MM)'),
    body('orarioFine').isString().withMessage('Orario Fine deve essere una stringa (formato HH:MM)'),
    body('giorniAttivi').isArray().withMessage('Giorni Attivi deve essere un array'),
    body('createdAt').optional().isISO8601().withMessage('CreatedAt deve essere una data valida (formato ISO8601)'),
    body('updatedAt').optional().isISO8601().withMessage('UpdatedAt deve essere una data valida (formato ISO8601)'),
    validateRequest
];

export const validateUpdateZonaZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('nome').optional().isString().withMessage('Nome deve essere una stringa'),
    body('descrizione').optional().isString().withMessage('Descrizione deve essere una stringa'),
    body('orarioInizio').optional().isString().withMessage('Orario Inizio deve essere una stringa (formato HH:MM)'),
    body('orarioFine').optional().isString().withMessage('Orario Fine deve essere una stringa (formato HH:MM)'),
    body('giorniAttivi').optional().isArray().withMessage('Giorni Attivi deve essere un array'),
    body('createdAt').optional().isISO8601().withMessage('CreatedAt deve essere una data valida (formato ISO8601)'),
    body('updatedAt').optional().isISO8601().withMessage('UpdatedAt deve essere una data valida (formato ISO8601)'),
    validateRequest
];

export const validateDeleteZonaZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];
