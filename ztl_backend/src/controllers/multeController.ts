// src/controllers/multeController.ts

import { Request, Response } from 'express';
import MultaDAO from '../dao/multaDAO'; // Importa il DAO
import Transito from '../models/transito';
import Veicolo from '../models/veicolo';
import ZTL from '../models/ztl';
import Varco from '../models/varco';
import Whitelist from '../models/whitelist';
import { generatePDF } from '../utils/pdfGenerator'; // Funzione per generare PDF
import { getGiorno, getOrario } from '../utils/manipolaData';
import { calcolaImportoMulta } from '../utils/calcolaMulta';
import moment from 'moment';

export const createMulta = async (transito: Transito, veicolo: Veicolo) => {
  try {  
    const importoMulta = calcolaImportoMulta(veicolo, moment(transito.dataOraTransito));

    // Crea la multa usando il DAO
    const multa = await MultaDAO.create({
      importo: importoMulta,
      veicoloId: veicolo.targa,
      transitoId: transito.id
    });

    console.log(`Multa creata con successo. Importo: €${multa.importo}`);
    
  } catch (error) {
    console.error('Errore nella creazione della multa:', error);
  }
};

export const checkMulte = async (req: Request, res: Response) => {
  try {
    const multe = await MultaDAO.findAllByVeicolo(req.params.id);
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


