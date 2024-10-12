import User from '../models/user';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

export class UserDAO {
  // Funzione per recuperare un utente tramite il suo ID
  static async getUserById(id: number) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato');
      }
      return user;
    } catch (error) {
      if (!(error instanceof ErrorFactory)) {
        throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero dell\'utente');
      }
      throw error;
    }
  }

  // Funzione per aggiornare il credito di un utente
  static async aggiornaCredito(id: number, nuovoCredito: number) {
    try {
      const [updatedCount, updatedUsers] = await User.update(
        { credit: nuovoCredito },
        { where: { id }, returning: true }
      );
      if (updatedCount === 0) {
        throw ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato per l\'aggiornamento del credito');
      }
      return updatedUsers[0];
    } catch (error) {
      if (!(error instanceof ErrorFactory)) {
        throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante l\'aggiornamento del credito');
      }
      throw error;
    }
  }
}
