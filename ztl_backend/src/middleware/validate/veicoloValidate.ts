import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddlaware';

// Espressione regolare per validare la targa del veicolo
const targaRegex = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;

export const validateGetVeicoloById = [
    param('targa')
        .matches(targaRegex)
        .withMessage('Targa deve essere un numero di registrazione valido per il veicolo'),
    validateRequest
];

export const validateCreateVeicolo = [
    body('targa')
        .matches(targaRegex)
        .withMessage('Targa deve essere un numero di registrazione valido per il veicolo'),
    body('tipoVeicolo').isInt({ min: 1 }).withMessage('Tipo Veicolo ID deve essere un intero positivo'),
    validateRequest
];

export const validateUpdateVeicolo = [
    param('targa')
        .matches(targaRegex)
        .withMessage('Targa deve essere un numero di registrazione valido per il veicolo'),
    body('tipoVeicolo').optional().isInt({ min: 1 }).withMessage('Tipo Veicolo ID deve essere un intero positivo'),
    validateRequest
];

export const validateDeleteVeicolo = [
    param('targa')
        .matches(targaRegex)
        .withMessage('Targa deve essere un numero di registrazione valido per il veicolo'),
    validateRequest
];