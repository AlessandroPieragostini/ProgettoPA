import { Request, Response } from 'express';
import Multa from '../models/multa'; 
import Transito from '../models/transito';
import Veicolo from '../models/veicolo';
import VarcoZTL from '../models/varcoZTL';
import Whitelist from '../models/whitelist'; 
import { generatePDF } from '../utils/pdfGenerator'; // Funzione per generare PDF
import { getGiorno, getOrario } from '../utils/manipolaData';
import { calcolaImportoMulta } from '../utils/calcolaMulta';
import moment from 'moment';

export const createMulta = async (transito: Transito, veicolo: Veicolo) => {
  try {

    // Controlla se il veicolo è nella white list (non viene multato)
    const isWhiteListed = await Whitelist.findOne({
      where: { targa: veicolo.targa }
    });

    if (isWhiteListed) {
      console.log(`Veicolo con targa ${veicolo.targa} è nella whitelist. Nessuna multa creata.`);
      return;
    }

    
    const giorno = getGiorno(transito.dataOraTransito);
    const orario = getOrario(transito.dataOraTransito);
    const varcoId = transito.idVarco
    
    const ztl = await VarcoZTL.findOne({ where: { varcoId } });
    if (ztl?.giornoSettimana == giorno && orario > ztl?.orarioApertura && orario < ztl?.orarioChiusura) {
      
      const importoMulta = calcolaImportoMulta(veicolo, moment(transito.dataOraTransito));
      
      // Crea la multa
      const multa = await Multa.create({
        importo: importoMulta,
        veicoloId: veicolo.targa,
        transitoId: transito.id
      });

      console.log(`Multa creata con successo. Importo: €${multa.importo}`);
    }

    

  } catch (error) {
    console.error('Errore nella creazione della multa:', error);
  }
};

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
      'Content-Disposition': `attachment; filename=bollettino-${multa.id}.pdf`,
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
