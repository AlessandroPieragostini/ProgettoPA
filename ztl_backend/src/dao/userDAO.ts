import User from '../models/user'; // Assicurati che il path sia corretto
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; // Importa il tuo ErrorFactory

export class UserDAO {
  // Metodo per trovare un utente tramite email
  public static async findByEmail(email: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw ErrorFactory.createError(ErrorTypes.Unauthorized, `Nessun utente con email ${email}`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
