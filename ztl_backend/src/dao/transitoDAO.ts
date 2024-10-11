import Transito from '../models/transito';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

class TransitoDAO {
  public async create(data: any) {
    return Transito.create(data);
  }

  public async findAllByVeicolo(targaVeicolo: string) {
    return Transito.findAll({ where: { targaVeicolo } });
  }

  public async findAllByVarco(varcoId: number) {
    return Transito.findAll({ where: { varcoId } });
  }

  public async findById(id: number) {
    const transito = await Transito.findByPk(id);
    if (!transito) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato');
    }
    return transito;
  }

  public async update(id: number, data: any) {
    const transito = await Transito.findByPk(id);
    if (!transito) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato');
    }
    return transito.update(data);
  }

  public async delete(id: number) {
    const transito = await Transito.findByPk(id);
    if (!transito) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato, impossibile eliminare.');
    }
    
    await transito.destroy();
    return { message: 'Transito eliminato con successo', transito }; // Restituisce un messaggio di conferma
  }
}

export default new TransitoDAO();
