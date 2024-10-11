import Varco from '../models/varco'; // Assicurati di avere il modello Varco
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; // Importa ErrorFactory

class VarcoDAO {
  public async create(data: any) {
    return Varco.create(data);
  }

  public async findAll() {
    return Varco.findAll();
  }

  public async findById(id: number) {
    const varco = await Varco.findByPk(id);
    if (!varco) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Varco non trovato');
    }
    return varco;
  }

  public async update(id: number, data: any) {
    const varco = await Varco.findByPk(id);
    if (!varco) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Varco non trovato');
    }
    return varco.update(data);
  }

  public async delete(id: number) {
    const varco = await Varco.findByPk(id);
    if (!varco) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Varco non trovato');
    }
    await varco.destroy();
    return true; // Restituisce true se l'eliminazione ha successo
  }
}

export default new VarcoDAO();
