import User from '../models/user';

export class UserDAO {
  static async getUserById(id: number) {
    try {
      return await User.findByPk(id);
    } catch (error) {
      throw new Error('Errore durante il recupero dell\'utente');
    }
  }

  static async aggiornaCredito(id: number, nuovoCredito: number) {
    try {
      return await User.update(
        { credit: nuovoCredito },
        { where: { id }, returning: true }
      );
    } catch (error) {
      throw new Error('Errore durante l\'aggiornamento del credito');
    }
  }
}
