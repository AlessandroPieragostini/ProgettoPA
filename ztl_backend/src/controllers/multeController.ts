import { Request, Response, NextFunction } from 'express';
import MultaDAO from '../dao/multaDAO'; 
import Transito from '../models/transito';
import Veicolo from '../models/veicolo';
import { generatePDF } from '../utils/pdfGenerator';
import { calcolaImportoMulta } from '../utils/calcolaMulta';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Funzione per creare una multa per un transito specifico
export const createMulta = async (transito: Transito, veicolo: Veicolo, next: NextFunction) => {
  try {
    // Calcola l'importo della multa in base al veicolo e alla data del transito
    const importoMulta = calcolaImportoMulta(veicolo, moment(transito.dataOraTransito));

    // Crea la multa nel database con il DAO
    const multa = await MultaDAO.create({
      importo: importoMulta,
      targaVeicolo: veicolo.targa,
      transitoId: transito.id,
      dataMulta: transito.dataOraTransito,
      uuidPagamento: uuidv4()
    });

    console.log(`Multa creata con successo. Importo: €${multa.importo}`);
    
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione della multa'));
  }
};

// Funzione per controllare tutte le multe associate ai veicoli di un utente
export const checkMulte = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const veicoli = await MultaDAO.findAllVeicoloByUser(Number(req.params.id));

    if (!veicoli || veicoli.length === 0) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Nessun veicolo trovato per questo utente'));
    }

    let multe: any[] = [];
    for (const veicolo of veicoli) {
      const multeVeicolo = await MultaDAO.findAllByVeicolo(veicolo.targa);
      multe = multe.concat(multeVeicolo);
    }

    res.status(200).json(multe); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero delle multe'));
  }
};

// Funzione per scaricare un bollettino in formato PDF relativo a una multa specifica
export const downloadBolletino = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const multa = await MultaDAO.findById(Number(req.params.id));

    if (!multa) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata'));
    }
    const pdfBuffer = await generatePDF(multa);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=bollettino-${multa.id}.pdf`,
    });

    res.send(pdfBuffer); 
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella generazione del PDF'));
  }
};
