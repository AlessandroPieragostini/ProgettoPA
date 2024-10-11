// src/dao/TransitoDAO.ts

import Transito from '../models/transito';

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
      return null;  // Restituisci null se il transito non viene trovato
    }
    await transito.destroy();
    return transito;
  }
}

export default new TransitoDAO();
