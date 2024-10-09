import { Request, Response } from 'express';
import { UserDAO } from '../dao/userDAO';
import { MultaDAO } from '../dao/multaDAO';
import PDFDocument from 'pdfkit';
import { v4 as uuidv4 } from 'uuid'; // Per generare UUID

export class PagamentoController {
  // Funzione per pagare una multa (già esistente)
  static async pagaMulta(req: Request, res: Response) {
    try {
      const { uuidPagamento } = req.params;
      const userId = req.user.id; // Supponendo che l'ID utente sia nel token JWT

      // Ottieni l'utente e la multa dal DAO
      const user = await UserDAO.getUserById(userId);
      const multa = await MultaDAO.getMultaById(Number(uuidPagamento));

      // Verifica se l'utente ha abbastanza credito per pagare la multa
      if (user.credito < multa.importo) {
        res.status(400).json({ messaggio: 'Credito insufficiente' });
        return ;
      }

      // Effettua il pagamento della multa
      const pagamento = await MultaDAO.pagaMulta(uuidPagamento);

      // Aggiorna il credito dell'utente
      const nuovoCredito = user.credito - multa.importo;
      await UserDAO.aggiornaCredito(userId, nuovoCredito);

      // Restituisce il risultato
      res.json({
        messaggio: 'Pagamento avvenuto con successo',
        pagamento: pagamento,
      });
      return;
    } catch (error) {
      res.status(500).json({ messaggio: 'Errore durante il pagamento della multa' });
      return;
    }
  }
  static async stampaRicevuta(req: Request, res: Response) {
    try {
      const { uuidPagamento } = req.params;
      const userId = req.user.id;

      // Ottieni l'utente e la multa dal DAO
      const user = await UserDAO.getUserById(userId);
      const multa = await MultaDAO.getMultaById(Number(uuidPagamento));

      if (!multa) {
        return res.status(404).json({ messaggio: 'Multa non trovata' });
      }

      // Crea un nuovo documento PDF
      const doc = new PDFDocument();
      const ricevutaId = uuidv4(); // Genera un UUID per la ricevuta
      const buffer: Buffer[] = [];

      // Scrivi nel PDF
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffer);
        res.contentType('application/pdf');
        res.send(pdfData);
      });

      // Aggiungi contenuti al PDF
      doc.fontSize(25).text('Ricevuta di Pagamento', { align: 'center' });
      doc.moveDown();
      doc.fontSize(14).text(`ID Ricevuta: ${ricevutaId}`);
      doc.text(`Targa: ${multa.targa}`);
      doc.text(`Importo: €${multa.importo}`);
      doc.text(`Data di Pagamento: ${new Date().toLocaleString()}`);
      doc.text(`UUID Pagamento: ${uuidPagamento}`);
      doc.moveDown();
      doc.text('Grazie per il pagamento!', { align: 'center' });

      // Chiudi il documento PDF
      doc.end();
    } catch (error) {
      return res.status(500).json({ messaggio: 'Errore durante la generazione della ricevuta' });
    }
  }
}
