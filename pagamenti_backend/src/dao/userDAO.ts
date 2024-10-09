import axiosClient from '../services/axiosClient';

export class UserDAO {
  static async getUserById(id: number) {
    try {
      const response = await axiosClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Errore durante il recupero dell\'utente');
    }
  }

  static async aggiornaCredito(userId: number, nuovoCredito: number) {
    try {
      const response = await axiosClient.put(`/users/${userId}/credito`, {
        credito: nuovoCredito,
      });
      return response.data;
    } catch (error) {
      throw new Error('Errore durante l\'aggiornamento del credito');
    }
  }
}
