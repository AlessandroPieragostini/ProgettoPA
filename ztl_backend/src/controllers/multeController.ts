// src/controllers/multeController.ts

import { Request, Response } from 'express';
import MultaDAO from '../dao/multaDAO'; // Importa il DAO
import Transito from '../models/transito';
import Veicolo from '../models/veicolo';
import { generatePDF } from '../utils/pdfGenerator'; // Funzione per generare PDF
import { calcolaImportoMulta } from '../utils/calcolaMulta';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export const createMulta = async (transito: Transito, veicolo: Veicolo) => {
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
    console.error('Errore nella creazione della multa:', error);
  }
};

export const checkMulte = async (req: Request, res: Response) => {
  try {
    const veicoli = await MultaDAO.findAllVeicoloByUser(Number(req.params.id));
    // Scorri ciascun veicolo e trova tutte le multe associate
    let multe: any[] = [];

    for (const veicolo of veicoli) {
      const multeVeicolo = await MultaDAO.findAllByVeicolo(veicolo.targa);
      multe = multe.concat(multeVeicolo);
    }

    res.status(200).json(multe);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero delle multe' });
  }
};

export const downloadBolletino = async (req: Request, res: Response) => {
  try {
    const multa = await MultaDAO.findById(Number(req.params.id));
    if (!multa) {
      res.status(404).json({ error: 'Multa non trovata' });
      return;
    }

    const pdfBuffer = await generatePDF(multa); // Genera il PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=bollettino-${multa.id}.pdf`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Errore nella generazione del PDF:', error);
    res.status(500).json({ error: 'Errore nella generazione del PDF' });
  }
};


