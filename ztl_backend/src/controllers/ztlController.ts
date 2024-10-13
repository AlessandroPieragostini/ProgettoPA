import { Request, Response, NextFunction } from 'express';
import ztlDAO from '../dao/ztlDAO';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Funzione per creare una nuova ZTL
export const createZTL = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newZTL = await ztlDAO.create(req.body);
    res.status(201).json(newZTL); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante la creazione della ZTL')); 
  }
};

// Funzione per recuperare tutte le ZTL
export const getZTLs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const ztls = await ztlDAO.findAll(); 
    res.status(200).json(ztls);
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero delle ZTL'));
  }
};

// Funzione per recuperare una ZTL tramite ID
export const getZTLById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const ztl = await ztlDAO.findById(Number(req.params.id)); 
    if (!ztl) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'ZTL non trovata')); 
    }
    res.status(200).json(ztl);
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero della ZTL'));
  }
};

// Funzione per aggiornare una ZTL tramite ID
export const updateZTL = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const ztl = await ztlDAO.update(Number(req.params.id), req.body);
    if (!ztl) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'ZTL non trovata'));
    }
    res.status(200).json(ztl); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante l\'aggiornamento della ZTL')); 
  }
};

// Funzione per eliminare una ZTL tramite ID
export const deleteZTL = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedZTL = await ztlDAO.delete(Number(req.params.id)); 
    if (!deletedZTL) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'ZTL non trovata')); 
    }
    res.status(200).json({ data: deletedZTL }); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante l\'eliminazione della ZTL'));
  }
};
