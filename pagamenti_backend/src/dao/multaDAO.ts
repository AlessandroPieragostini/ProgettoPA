import Multa from '../models/multa';

export class MultaDAO {
  static async getMultaByUuid(uuidPagamento: string) {
    try {
      return await Multa.findOne({ where: { uuidPagamento } });
    } catch (error) {
      throw new Error('Errore durante il recupero della multa');
    }
  }

  static async pagaMulta(id: number) {
    try {
      return await Multa.update(
        { pagato: true },
        { where: { id }, returning: true }
      );
    } catch (error) {
      throw new Error('Errore durante il pagamento della multa');
    }
  }
}
