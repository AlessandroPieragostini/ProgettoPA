// src/dao/TransitoDAO.ts

import Transito from '../models/transito';

class TransitoDAO {
  public async create(data: any) {
    return Transito.create(data);
  }

  public async findAllByVeicolo(veicoloId: string) {
    return Transito.findAll({ where: { veicoloId } });
  }

  public async findAllByVarco(varcoId: number) {
    return Transito.findAll({ where: { varcoId } });
  }

  public async findById(id: number) {
    return Transito.findByPk(id);
  }

  public async update(id: number, data: any) {
    const transito = await Transito.findByPk(id);
    if (!transito) {
      throw new Error('Transito not found');
    }
    return transito.update(data);
  }

  public async delete(id: number) {
    const transito = await Transito.findByPk(id);
    if (!transito) {
      throw new Error('Transito not found');
    }
    return transito.destroy();
  }
}

export default new TransitoDAO();
