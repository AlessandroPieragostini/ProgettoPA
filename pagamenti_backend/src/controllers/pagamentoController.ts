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

      // Se l'utente non esiste, restituisce un errore
      const user = await UserDAO.getUserById(userId); 
      if (!user) {
        return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato')); 
      }

      // Se la multa non esiste, restituisce un errore
      const multa = await MultaDAO.getMultaByUuid(uuidPagamento); 
      if (!multa) {
        return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata')); 
      }

       // Restituisce un errore se la multa è già pagata
      if (multa.pagato) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'La multa è già stata pagata'));
      }

      // Verifica che l'utente abbia credito sufficiente
      if (user.credit < multa.importo) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Credito insufficiente')); 
      }

      // Aggiorna la multa come pagata nel database
      const pagamento = await MultaDAO.pagaMulta(multa.id);

      // Aggiorna il credito dell'utente sottraendo l'importo della multa
      const nuovoCredito = user.credit - multa.importo;
      await UserDAO.aggiornaCredito(userId, nuovoCredito);

      // Restituisce la conferma di avvenuto pagamento e il dettaglio del pagamento
      res.json({
        messaggio: 'Pagamento avvenuto con successo',
        pagamento: pagamento,
      });
    } catch (error) {
      // Gestisce eventuali errori durante il processo di pagamento
      return next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il pagamento della multa'));
    }
  }

  // Funzione per generare e stampare la ricevuta in formato PDF
  static async stampaRicevuta(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuidPagamento } = req.params; 

      const multa = await MultaDAO.getMultaByUuid(uuidPagamento); 
      if (!multa || !multa.pagato) {
        // Se la multa non esiste o non è stata pagata, restituisce un errore
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'La multa non è stata pagata o non esiste'));
      }

      // Crea un nuovo documento PDF
      const doc = new PDFDocument();
      const buffer: Buffer[] = []; 

      // Aggiunge il contenuto del PDF al buffer
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffer); 
        res.contentType('application/pdf'); 
        res.send(pdfData); 
      });

      // Genera il contenuto del PDF: titolo, dati della multa, importo, data e UUID del pagamento
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
      // Gestisce eventuali errori durante la generazione della ricevuta
      return next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante la generazione della ricevuta'));
    }
  }
}
