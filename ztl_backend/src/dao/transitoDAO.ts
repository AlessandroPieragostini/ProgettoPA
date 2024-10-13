import Transito from '../models/transito';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Classe DAO per la gestione dei transiti
class TransitoDAO {
  // Crea un nuovo transito con i dati forniti
  public async create(data: any) {
    return Transito.create(data);
  }

  // Trova tutti i transiti associati a un veicolo tramite la targa
  public async findAllByVeicolo(targaVeicolo: string) {
    return Transito.findAll({ where: { targaVeicolo } });
  }

  // Trova tutti i transiti registrati in un varco specifico
  public async findAllByVarco(varcoId: number) {
    return Transito.findAll({ where: { varcoId } });
  }

  // Trova un transito specifico tramite ID
  public async findById(id: number) {
    const transito = await Transito.findByPk(id);
    if (!transito) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato');
    }
    return transito;
  }

  // Aggiorna un transito esistente con i nuovi dati forniti
  public async update(id: number, data: any) {
    const transito = await Transito.findByPk(id);
    if (!transito) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato');
    }
    return transito.update(data);
  }

  // Elimina un transito tramite ID e restituisce un messaggio di conferma
  public async delete(id: number) {
    const transito = await Transito.findByPk(id);
    if (!transito) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato, impossibile eliminare.');
    }
    
    await transito.destroy();
    return { message: 'Transito eliminato con successo', transito };
  }
}

// Esporta un'istanza singleton di TransitoDAO
export default new TransitoDAO();
