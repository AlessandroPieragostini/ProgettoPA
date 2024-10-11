import { param, body } from 'express-validator';
import validateRequest from './validateRequestMiddlaware';

export const validateHandleTariffaRequests = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validateCreateTariffa = [
    body('tipoVeicolo').isString().withMessage('Tipo Veicolo deve essere una stringa'),
    body('fasciaOraria').isString().withMessage('Fascia Oraria deve essere una stringa (formato es: "09:00-12:00")'),
    body('giornoFestivo').isBoolean().withMessage('Giorno Festivo deve essere un valore booleano (true o false)'),
    body('costo').isInt({ min: 1 }).withMessage('Costo deve essere un intero maggiore o uguale a 1'),
    validateRequest
];

export const validateUpdateTariffa = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('tipoVeicolo').optional().isString().withMessage('Tipo Veicolo deve essere una stringa'),
    body('fasciaOraria').optional().isString().withMessage('Fascia Oraria deve essere una stringa (formato es: "09:00-12:00")'),
    body('giornoFestivo').optional().isBoolean().withMessage('Giorno Festivo deve essere un valore booleano (true o false)'),
    body('costo').optional().isInt({ min: 1 }).withMessage('Costo deve essere un intero maggiore o uguale a 1'),
    validateRequest
];

export const validateDeleteTariffa = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];
