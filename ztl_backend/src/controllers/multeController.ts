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
    
    // Controlla se il veicolo è nella white list
    const isWhiteListed = await Whitelist.findOne({ where: { targa: veicolo.targa } });
              
    if (isWhiteListed) {
      console.log(`Veicolo con targa ${veicolo.targa} è nella whitelist. Nessuna multa creata.`);
      return;
    }

    const giorno = getGiorno(transito.dataOraTransito);
    const orario = getOrario(transito.dataOraTransito);
    const varco = await Varco.findOne({ where: { id: transito.varcoId } });
    const ztl = await ZTL.findOne({ where: { id: varco?.ztlId } });

    if (ztl?.giorniAttivi.includes(giorno) && orario > ztl.orarioInizio && orario < ztl.orarioFine) {
      const importoMulta = calcolaImportoMulta(veicolo, moment(transito.dataOraTransito));

      // Crea la multa usando il DAO
      const multa = await MultaDAO.create({
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

// export const payMulta = async (req: Request, res: Response) => {
//   try {
//     const { uuid } = req.body; // UUID della multa
//     const multa = await MultaDAO.findByUUID(uuid);
//     if (!multa) {
//       res.status(404).json({ error: 'Multa non trovata' });
//       return;
//     }

//     // Logica di pagamento (es. verifica dei crediti, ecc.)
//     await MultaDAO.update(multa.id, { pagata: true });

//     res.status(200).json({ message: 'Multa pagata con successo' });
//   } catch (error) {
//     res.status(500).json({ error: 'Errore nel processamento del pagamento' });
//   }
// };
