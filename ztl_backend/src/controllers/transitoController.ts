import { Request, Response, NextFunction } from 'express';
import TransitoDAO from '../dao/transitoDAO';
import Veicolo from '../models/veicolo';
import Whitelist from '../models/whitelist';
import ZTL from '../models/ztl';
import Varco from '../models/varco';
import { getGiorno, getOrario } from '../utils/manipolaData';
import { createMulta } from './multeController';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Funzione per creare un nuovo transito e verificare se deve essere emessa una multa
export const createTransito = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { targa, varcoId, dataOraTransito } = req.body;

    const veicolo = await Veicolo.findOne({ where: { targa } });
    if (!veicolo) {
      const error = ErrorFactory.createError(ErrorTypes.NotFound, 'Veicolo non trovato');
      return next(error);     
    }

    // Crea il nuovo transito nel database
    const nuovoTransito = await TransitoDAO.create({
      targaVeicolo: veicolo.targa,
      varcoId,
      dataOraTransito
    });

    // Controlla se il veicolo è nella whitelist, se sì non viene emessa multa
    const isWhiteListed = await Whitelist.findOne({ where: { targaVeicolo: veicolo.targa } });
    if (isWhiteListed) {
      console.log(`Veicolo con targa ${veicolo.targa} è nella whitelist. Nessuna multa creata.`);
      res.status(201).json(nuovoTransito); 
      return; 
    }

    // Verifica se la ZTL è attiva per il giorno e orario del transito, e crea una multa se necessario
    const giorno = getGiorno(nuovoTransito.dataOraTransito);
    const orario = getOrario(nuovoTransito.dataOraTransito);
    const varco = await Varco.findOne({ where: { id: nuovoTransito.varcoId } });
    const ztl = await ZTL.findOne({ where: { id: varco?.ztlId } });

    if (ztl?.giorniAttivi.includes(giorno) && orario > ztl.orarioInizio && orario < ztl.orarioFine) {
      await createMulta(nuovoTransito, veicolo, next); 
    } else {
      console.log(`ZTL non attiva questo giorno. Nessuna multa creata.`);
    }

    res.status(201).json(nuovoTransito); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del transito'));
  }
};

// Funzione per ottenere tutti i transiti di un veicolo
export const getTransitiByVeicolo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { targa } = req.params;

    const veicolo = await Veicolo.findOne({ where: { targa } });
    if (!veicolo) {
      const error = ErrorFactory.createError(ErrorTypes.NotFound, 'Veicolo non trovato');
      return next(error); 
    }

    const transiti = await TransitoDAO.findAllByVeicolo(veicolo.targa);
    res.status(200).json(transiti); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei transiti'));
  }
};

// Funzione per ottenere tutti i transiti registrati in un varco specifico
export const getTransitiByVarco = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { varcoId } = req.params;

    const transiti = await TransitoDAO.findAllByVarco(Number(varcoId));

    if (transiti.length === 0) {
      const error = ErrorFactory.createError(ErrorTypes.NotFound, 'Nessun transito trovato per questo varco');
      return next(error); 
    }

    res.status(200).json(transiti); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei transiti per il varco'));
  }
};

// Funzione per ottenere un transito specifico tramite ID
export const getTransitoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const transito = await TransitoDAO.findById(Number(id));
    if (!transito) {
      const error = ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato');
      return next(error); 
    }

    res.status(200).json(transito); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero del transito'));
  }
};

// Funzione per aggiornare un transito tramite ID
export const updateTransito = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { targaVeicolo, varcoId, dataOraTransito } = req.body;

    const transito = await TransitoDAO.update(Number(id), { targaVeicolo, varcoId, dataOraTransito });
    
    if (!transito) {
      const error = ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato');
      return next(error); 
    }

    res.status(200).json(transito); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nell\'aggiornamento del transito'));
  }
};

// Funzione per eliminare un transito tramite ID
export const deleteTransito = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const transitoEliminato = await TransitoDAO.delete(Number(id));

    if (!transitoEliminato) {
      const error = ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato');
      return next(error); 
    }

    res.status(200).json({ data: transitoEliminato }); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante l\'eliminazione del transito'));
  }
};
