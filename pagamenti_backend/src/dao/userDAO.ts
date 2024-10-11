import User from '../models/user';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; // Assicurati di avere il percorso corretto

export class UserDAO {
  static async getUserById(id: number) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato');
      }
      return user;
    } catch (error) {
      // Riempiamo l'errore se l'errore non è già un HttpError
      if (!(error instanceof ErrorFactory)) {
        throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero dell\'utente');
      }
      throw error;
    }
  }

  static async aggiornaCredito(id: number, nuovoCredito: number) {
    try {
      const [updatedCount, updatedUsers] = await User.update(
        { credit: nuovoCredito },
        { where: { id }, returning: true }
      );
      if (updatedCount === 0) {
        throw ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato per l\'aggiornamento del credito');
      }
      return updatedUsers[0]; // Restituisci l'utente aggiornato
    } catch (error) {
      // Riempiamo l'errore se l'errore non è già un HttpError
      if (!(error instanceof ErrorFactory)) {
        throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante l\'aggiornamento del credito');
      }
      throw error;
    }
  }
}
