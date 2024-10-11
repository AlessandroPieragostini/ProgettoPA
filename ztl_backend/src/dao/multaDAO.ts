import Multa from '../models/multa';
import Veicolo from '../models/veicolo';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; // Importa ErrorFactory

class MultaDAO {
  public async create(data: any) {
    return Multa.create(data);
  }

  public async findAllVeicoloByUser(utente_id: number) {
    return Veicolo.findAll({ where: { utente_id } });
  }

  public async findAllByVeicolo(targaVeicolo: string) {
    return Multa.findAll({ where: { targaVeicolo } });
  }

  public async findById(id: number) {
    const multa = await Multa.findByPk(id);
    if (!multa) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata');
    }
    return multa;
  }

  public async findByUUID(uuid: string) {
    const multa = await Multa.findOne({ where: { uuid } });
    if (!multa) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata con UUID specificato');
    }
    return multa;
  }

  public async update(id: number, data: any) {
    const multa = await Multa.findByPk(id);
    if (!multa) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata');
    }
    return multa.update(data);
  }
}

export default new MultaDAO();
