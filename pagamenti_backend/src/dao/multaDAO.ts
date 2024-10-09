import axiosClient from '../services/axiosClient';

export class MultaDAO {
  static async getMultaById(id: number) {
    try {
      const response = await axiosClient.get(`/multas/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Errore durante il recupero della multa');
    }
  }

  static async pagaMulta(uuidPagamento: string) {
    try {
      const response = await axiosClient.post(`/multas/paga/${uuidPagamento}`);
      return response.data;
    } catch (error) {
      throw new Error('Errore durante il pagamento della multa');
    }
  }
}
