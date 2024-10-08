// src/dao/VarcoDAO.ts

import Varco from '../models/varco'; // Assicurati di avere il modello Varco

class VarcoDAO {
  public async create(data: any) {
    return Varco.create(data);
  }

  public async findAll() {
    return Varco.findAll();
  }

  public async findById(id: number) {
    return Varco.findByPk(id);
  }

  public async update(id: number, data: any) {
    const varco = await Varco.findByPk(id);
    if (!varco) {
      throw new Error('Varco not found');
    }
    return varco.update(data);
  }

  public async delete(id: number) {
    const varco = await Varco.findByPk(id);
    if (!varco) {
      throw new Error('Varco not found');
    }
    return varco.destroy();
  }
}

export default new VarcoDAO();
