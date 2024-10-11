import { Request, Response, NextFunction } from 'express';
import MultaDAO from '../dao/multaDAO'; // Importa il DAO
import Transito from '../models/transito';
import Veicolo from '../models/veicolo';
import { generatePDF } from '../utils/pdfGenerator'; // Funzione per generare PDF
import { calcolaImportoMulta } from '../utils/calcolaMulta';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; // Importa l'ErrorFactory

export const createMulta = async (transito: Transito, veicolo: Veicolo, next: NextFunction) => {
  try {
    const importoMulta = calcolaImportoMulta(veicolo, moment(transito.dataOraTransito));

    // Crea la multa usando il DAO
    const multa = await MultaDAO.create({
      importo: importoMulta,
      targaVeicolo: veicolo.targa,
      transitoId: transito.id,
      dataMulta: transito.dataOraTransito,
      uuidPagamento: uuidv4()
    });

    console.log(`Multa creata con successo. Importo: €${multa.importo}`);
    
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione della multa')); // Passa l'errore al middleware
  }
};

export const checkMulte = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const veicoli = await MultaDAO.findAllVeicoloByUser(Number(req.params.id));

    if (!veicoli || veicoli.length === 0) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Nessun veicolo trovato per questo utente'));
    }

    // Scorri ciascun veicolo e trova tutte le multe associate
    let multe: any[] = [];
    for (const veicolo of veicoli) {
      const multeVeicolo = await MultaDAO.findAllByVeicolo(veicolo.targa);
      multe = multe.concat(multeVeicolo);
    }

    res.status(200).json(multe);
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero delle multe')); // Passa l'errore al middleware
  }
};

export const downloadBolletino = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const multa = await MultaDAO.findById(Number(req.params.id));

    if (!multa) {
      return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata'));
    }

    const pdfBuffer = await generatePDF(multa); // Genera il PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=bollettino-${multa.id}.pdf`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella generazione del PDF')); // Passa l'errore al middleware
  }
};
