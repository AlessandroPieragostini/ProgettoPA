import { Request, Response } from 'express';
import Multa from '../models/multa'; // Assicurati di avere il modello Multa
import { generatePDF } from '../utils/pdfGenerator'; // Funzione per generare PDF

export const checkMulte = async (req: Request, res: Response) => {
  try {
    const multe = await Multa.findAll({ where: { targaVeicolo: req.user?.username } }); // Supponendo che il username sia la targa
    res.status(200).json(multe);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching fines' });
  }
};

export const downloadBolletino = async (req: Request, res: Response): Promise<Response> => {
  try {
    const multa = await Multa.findByPk(req.params.id);
    if (!multa) return res.status(404).json({ error: 'Multa non trovata' });

    const pdfBuffer = await generatePDF(multa); // Genera il PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=bollettino-${multa.idMulta}.pdf`,
    });
    
    return res.send(pdfBuffer); // Restituisci esplicitamente la risposta
  } catch (error) {
    return res.status(500).json({ error: 'Errore nella generazione del PDF' });
  }
};


export const payMulta = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.body; // UUID della multa
    const multa = await Multa.findOne({ where: { uuid } });
    if (!multa) return res.status(404).json({ error: 'Multa not found' });

    // Logica di pagamento (es. verifica dei crediti, ecc.)

    res.status(200).json({ message: 'Multa pagata con successo' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing payment' });
  }
};
