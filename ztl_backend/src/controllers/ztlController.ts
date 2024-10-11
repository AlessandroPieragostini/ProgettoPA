// src/controllers/ztlController.ts

import { Request, Response, NextFunction } from 'express';
import ztlDAO from '../dao/ztlDAO'; // Importa il DAO
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; // Importa l'ErrorFactory

export const createZTL = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newZTL = await ztlDAO.create(req.body);
    res.status(201).json(newZTL); // Invia la risposta
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante la creazione della ZTL')); // Passa l'errore al middleware
  }
};

export const getZTLs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const ztls = await ztlDAO.findAll();
    res.status(200).json(ztls); // Invia la risposta
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero delle ZTL')); // Passa l'errore al middleware
  }
};

export const getZTLById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const ztl = await ztlDAO.findById(Number(req.params.id));
    if (!ztl) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'ZTL non trovata')); // Passa l'errore al middleware
    }
    res.status(200).json(ztl); // Invia la risposta
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero della ZTL')); // Passa l'errore al middleware
  }
};

export const updateZTL = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const ztl = await ztlDAO.update(Number(req.params.id), req.body);
    if (!ztl) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'ZTL non trovata')); // Passa l'errore al middleware
    }
    res.status(200).json(ztl); // Invia la risposta
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante l\'aggiornamento della ZTL')); // Passa l'errore al middleware
  }
};

export const deleteZTL = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedZTL = await ztlDAO.delete(Number(req.params.id));
    if (!deletedZTL) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'ZTL non trovata')); // Passa l'errore al middleware
    }
    res.status(200).json({ message: 'ZTL eliminata con successo' }); // Invia la risposta di successo
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante l\'eliminazione della ZTL')); // Passa l'errore al middleware
  }
};
