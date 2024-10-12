import { Request, Response, NextFunction } from 'express';
import { UserDAO } from '../dao/userDAO';
import { MultaDAO } from '../dao/multaDAO';
import PDFDocument from 'pdfkit';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; // Assicurati di avere il percorso corretto

export class PagamentoController {
  // Funzione per pagare una multa
  static async pagaMulta(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuidPagamento } = req.params;
      const userId = req.user.id;

      const user = await UserDAO.getUserById(userId);
      if (!user) {
        return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato'));
      }

      const multa = await MultaDAO.getMultaByUuid(uuidPagamento);
      if (!multa) {
        return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata'));
      }

      // Controlla se la multa è già stata pagata
      if (multa.pagato) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'La multa è già stata pagata'));
      }

      if (user.credit < multa.importo) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Credito insufficiente'));
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
      return next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il pagamento della multa'));
    }
  }

  // Funzione per stampare la ricevuta
  static async stampaRicevuta(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuidPagamento } = req.params;

      const multa = await MultaDAO.getMultaByUuid(uuidPagamento);
      if (!multa || !multa.pagato) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'La multa non è stata pagata o non esiste'));
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
      doc.text(`UUID Pagamento: ${uuidPagamento}`);
      doc.text(`ID Multa: ${multa.id}`);
      doc.moveDown();
      doc.text('Grazie per il pagamento!', { align: 'center' });

      doc.end();
    } catch (error) {
      return next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante la generazione della ricevuta'));
    }
  }
}
