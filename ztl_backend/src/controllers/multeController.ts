import { Request, Response } from 'express';
import Multa from '../models/multa'; // Assicurati di avere il modello Multa
import { generatePDF } from '../utils/pdfGenerator'; // Funzione per generare PDF

export const checkMulte = async (req: Request, res: Response) => {
  try {
    const multe = await Multa.findAll({ where: { targaVeicolo: req.params.id } }); 
    res.status(200).json(multe);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching fines' });
  }
};

export const downloadBolletino = async (req: Request, res: Response) => {
  try {
    const multa = await Multa.findByPk(req.params.id);
    if (!multa) {
      res.status(404).json({ error: 'Multa non trovata' });
      return;
    }

    const pdfBuffer = await generatePDF(multa); // Genera il PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=bollettino-${multa.idMulta}.pdf`,
    });
    
    res.send(pdfBuffer); // Restituisci il buffer PDF
  } catch (error) {
    console.error(error); // Aggiungi log per aiutarti a debuggare
    res.status(500).json({ error: 'Errore nella generazione del PDF' });
  }
};


export const payMulta = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.body; // UUID della multa
    const multa = await Multa.findOne({ where: { uuid } });
    if (!multa) {
      res.status(404).json({ error: 'Multa not found' });
      return;
    }

    // Logica di pagamento (es. verifica dei crediti, ecc.)

    res.status(200).json({ message: 'Multa pagata con successo' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing payment' });
  }
};
