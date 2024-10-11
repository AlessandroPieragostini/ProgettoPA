import { Request, Response } from 'express';
import { UserDAO } from '../dao/userDAO';
import { MultaDAO } from '../dao/multaDAO';
import PDFDocument from 'pdfkit';
import { v4 as uuidv4 } from 'uuid'; 

export class PagamentoController {
  // Funzione per pagare una multa
  static async pagaMulta(req: Request, res: Response) {
    try {
      const { uuidPagamento } = req.params;
      const userId = req.user.id;
      const user = await UserDAO.getUserById(userId);
      const multa = await MultaDAO.getMultaByUuid(uuidPagamento);
      
      if (!user) {
        res.status(404).json({ messaggio: 'Utente non trovato' });
        return;
      }

      if (!multa) {
        res.status(404).json({ messaggio: 'Multa non trovata' });
        return
      }
      
      // Controlla se la multa è già stata pagata
      if (multa.pagato) {
        res.status(400).json({ messaggio: 'La multa è già stata pagata' });
        return
      }

      if (user.credit < multa.importo) {
        res.status(400).json({ messaggio: 'Credito insufficiente' });
        return;
      }

      // Aggiorna la multa come pagata
      const pagamento = await MultaDAO.pagaMulta(multa.id);

      // Aggiorna il credito dell'utente
      const nuovoCredito = user.credit - multa.importo;
      await UserDAO.aggiornaCredito(userId, nuovoCredito);

      res.json({
        messaggio: 'Pagamento avvenuto con successo',
        pagamento: pagamento,
      });
    } catch (error) {
      res.status(500).json({ messaggio: 'Errore durante il pagamento della multa' });
    }
  }

  // Funzione per stampare la ricevuta
  static async stampaRicevuta(req: Request, res: Response) {
    try {
      const { uuidPagamento } = req.params;

      const multa = await MultaDAO.getMultaByUuid(uuidPagamento);

      if (!multa || !multa.pagato) {
        res.status(400).json({ messaggio: 'La multa non è stata pagata o non esiste' });
        return;
      }

      const doc = new PDFDocument();
      const buffer: Buffer[] = [];

      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffer);
        res.contentType('application/pdf');
        res.send(pdfData);
      });

      // Genera il contenuto del PDF
      doc.fontSize(25).text('Ricevuta di Pagamento', { align: 'center' });
      doc.moveDown();
      doc.text(`Targa: ${multa.targaVeicolo}`);
      doc.text(`Importo: €${multa.importo}`);
      doc.text(`Data di Pagamento: ${new Date().toLocaleString()}`);
      doc.text(`UUID Pagamento: ${uuidPagamento}`);
      doc.text(`ID Multa: ${multa.id}`);
      doc.moveDown();
      doc.text('Grazie per il pagamento!', { align: 'center' });

      doc.end();
    } catch (error) {
      res.status(500).json({ messaggio: 'Errore durante la generazione della ricevuta' });
    }
  }
}
