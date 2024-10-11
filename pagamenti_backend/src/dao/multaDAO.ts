import Multa from '../models/multa';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; // Assicurati di avere il percorso corretto

export class MultaDAO {
  static async getMultaByUuid(uuidPagamento: string) {
    try {
      const multa = await Multa.findOne({ where: { uuidPagamento } });
      if (!multa) {
        throw ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata');
      }
      return multa;
    } catch (error) {
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero della multa');
    }
  }

  static async pagaMulta(id: number) {
    try {
      const [updatedCount, updatedMulta] = await Multa.update(
        { pagato: true },
        { where: { id }, returning: true }
      );

      if (updatedCount === 0) {
        throw ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata');
      }

      return updatedMulta[0];
    } catch (error) {
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il pagamento della multa');
    }
  }
}
