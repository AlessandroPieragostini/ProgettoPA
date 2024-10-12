import Multa from '../models/multa';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

export class MultaDAO {
  // Funzione per ottenere una multa utilizzando il suo UUID di pagamento
  static async getMultaByUuid(uuidPagamento: string) {
    try {
      const multa = await Multa.findOne({ where: { uuidPagamento } });
      if (!multa) {
        // Se la multa non esiste, genera un errore di tipo "NotFound"
        throw ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata');
      }
      return multa;
    } catch (error) {
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero della multa');
    }
  }

  // Funzione per aggiornare lo stato della multa come pagata
  static async pagaMulta(id: number) {
    try {
      // Aggiorna il campo "pagato" della multa nel database
      const [updatedCount, updatedMulta] = await Multa.update(
        { pagato: true }, 
        { where: { id }, returning: true }
      );

      if (updatedCount === 0) {
        throw ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata');
      }

      return updatedMulta[0];
    } catch (error) {
      // Gestisce eventuali errori durante l'aggiornamento della multa
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il pagamento della multa');
    }
  }
}
