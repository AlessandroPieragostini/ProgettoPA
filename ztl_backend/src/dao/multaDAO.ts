// src/dao/MultaDAO.ts

import Multa from '../models/multa';

class MultaDAO {
  public async create(data: any) {
    return Multa.create(data);
  }

  public async findAllByVeicolo(targaVeicolo: string) {
    return Multa.findAll({ where: { targaVeicolo } });
  }

  public async findById(id: number) {
    return Multa.findByPk(id);
  }

  public async findByUUID(uuid: string) {
    return Multa.findOne({ where: { uuid } });
  }

  public async update(id: number, data: any) {
    const multa = await Multa.findByPk(id);
    if (!multa) {
      throw new Error('Multa not found');
    }
    return multa.update(data);
  }
}

export default new MultaDAO();
