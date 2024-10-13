import Multa from '../models/multa';
import Veicolo from '../models/veicolo';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; 

// Classe DAO per la gestione delle multe
class MultaDAO {
  // Crea una nuova multa con i dati forniti
  public async create(data: any) {
    return Multa.create(data);
  }

  // Trova tutti i veicoli di un utente specifico tramite ID utente
  public async findAllVeicoloByUser(utente_id: number) {
    return Veicolo.findAll({ where: { utente_id } });
  }

  // Trova tutte le multe associate a un veicolo tramite la sua targa
  public async findAllByVeicolo(targaVeicolo: string) {
    return Multa.findAll({ where: { targaVeicolo } });
  }

  // Trova una multa tramite il suo ID
  public async findById(id: number) {
    const multa = await Multa.findByPk(id);
    if (!multa) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata');
    }
    return multa;
  }

  // Trova una multa tramite il suo UUID
  public async findByUUID(uuid: string) {
    const multa = await Multa.findOne({ where: { uuid } });
    if (!multa) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata con UUID specificato');
    }
    return multa;
  }

  // Aggiorna una multa esistente con i nuovi dati forniti
  public async update(id: number, data: any) {
    const multa = await Multa.findByPk(id);
    if (!multa) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata');
    }
    return multa.update(data);
  }
}

// Esporta un'istanza singleton di MultaDAO
export default new MultaDAO();
