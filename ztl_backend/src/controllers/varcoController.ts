import { Request, Response, NextFunction } from 'express';
import VarcoDAO from '../dao/varcoDAO'; 
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Funzione per creare un nuovo varco
export const createVarco = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newVarco = await VarcoDAO.create(req.body); 
    res.status(201).json(newVarco); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante la creazione del varco')); // Gestione errori
  }
};

// Funzione per recuperare tutti i varchi
export const getVarchi = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const varchi = await VarcoDAO.findAll();
    res.status(200).json(varchi); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero dei varchi'));
  }
};

// Funzione per recuperare un varco tramite ID
export const getVarcoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const varco = await VarcoDAO.findById(Number(req.params.id));
    if (!varco) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco non trovato'));
    }
    res.status(200).json(varco); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero del varco'));
  }
};

// Funzione per aggiornare un varco tramite ID
export const updateVarco = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const varco = await VarcoDAO.update(Number(req.params.id), req.body); 
    if (!varco) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco non trovato')); 
    }
    res.status(200).json(varco); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante l\'aggiornamento del varco')); 
  }
};

// Funzione per eliminare un varco tramite ID
export const deleteVarco = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedVarco = await VarcoDAO.delete(Number(req.params.id)); 
    if (!deletedVarco) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco non trovato'));
    }
    res.status(200).json({ data: deletedVarco }); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante l\'eliminazione del varco')); 
  }
};
