// src/controllers/VarcoController.ts

import { Request, Response, NextFunction } from 'express';
import VarcoDAO from '../dao/varcoDAO'; // Importa il DAO
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; // Importa l'ErrorFactory

export const createVarco = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newVarco = await VarcoDAO.create(req.body);
    res.status(201).json(newVarco); // Invia la risposta
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante la creazione del varco')); // Passa l'errore al middleware
  }
};

export const getVarchi = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const varchi = await VarcoDAO.findAll();
    res.status(200).json(varchi); // Invia la risposta
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero dei varchi')); // Passa l'errore al middleware
  }
};

export const getVarcoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const varco = await VarcoDAO.findById(Number(req.params.id));
    if (!varco) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco non trovato')); // Passa l'errore al middleware
    }
    res.status(200).json(varco); // Invia la risposta
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero del varco')); // Passa l'errore al middleware
  }
};

export const updateVarco = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const varco = await VarcoDAO.update(Number(req.params.id), req.body);
    if (!varco) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco non trovato')); // Passa l'errore al middleware
    }
    res.status(200).json(varco); // Invia la risposta
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante l\'aggiornamento del varco')); // Passa l'errore al middleware
  }
};

export const deleteVarco = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedVarco = await VarcoDAO.delete(Number(req.params.id));
    if (!deletedVarco) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco non trovato')); // Passa l'errore al middleware
    }
    res.status(200).json({ data: deletedVarco }); // Invia la risposta
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante l\'eliminazione del varco')); // Passa l'errore al middleware
  }
};
