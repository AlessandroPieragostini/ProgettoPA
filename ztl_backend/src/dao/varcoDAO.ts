import Varco from '../models/varco'; 
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; 

// Classe DAO per la gestione dei varchi
class VarcoDAO {
  // Crea un nuovo varco con i dati forniti
  public async create(data: any) {
    return Varco.create(data);
  }

  // Recupera tutti i varchi dal database
  public async findAll() {
    return Varco.findAll();
  }

  // Trova un varco specifico tramite ID
  public async findById(id: number) {
    const varco = await Varco.findByPk(id);
    if (!varco) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Varco non trovato');
    }
    return varco;
  }

  // Aggiorna un varco esistente con i nuovi dati forniti
  public async update(id: number, data: any) {
    const varco = await Varco.findByPk(id);
    if (!varco) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Varco non trovato');
    }
    return varco.update(data);
  }

  // Elimina un varco tramite ID e restituisce un messaggio di conferma
  public async delete(id: number) {
    const varco = await Varco.findByPk(id);
    if (!varco) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Varco non trovato');
    }
    await varco.destroy();
    return { message: 'Varco eliminato con successo', varco };
  }
}

// Esporta un'istanza singleton di VarcoDAO
export default new VarcoDAO();
