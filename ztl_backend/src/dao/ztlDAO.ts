import ZTL from '../models/ztl';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Classe DAO per la gestione delle ZTL
class ztlDAO {
  // Crea una nuova ZTL con i dati forniti
  public async create(data: any) {
    return ZTL.create(data);
  }

  // Recupera tutte le ZTL dal database
  public async findAll() {
    return ZTL.findAll();
  }

  // Trova una ZTL specifica tramite ID
  public async findById(id: number) {
    const ztl = await ZTL.findByPk(id);
    if (!ztl) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'ZTL non trovata');
    }
    return ztl;
  }

  // Aggiorna una ZTL esistente con i nuovi dati forniti
  public async update(id: number, data: any) {
    const ztl = await ZTL.findByPk(id);
    if (!ztl) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'ZTL non trovata');
    }
    return ztl.update(data);
  }

  // Elimina una ZTL tramite ID e restituisce un messaggio di conferma
  public async delete(id: number) {
    const ztl = await ZTL.findByPk(id);
    if (!ztl) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'ZTL non trovata');
    }
    await ztl.destroy();
    return { message: 'ZTL eliminata con successo', ztl };
  }
}

// Esporta un'istanza singleton di ztlDAO
export default new ztlDAO();
