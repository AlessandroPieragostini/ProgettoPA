// src/dao/ZtlDAO.ts

import ZTL from '../models/ztl';

class ztlDAO {
  public async create(data: any) {
    return ZTL.create(data);
  }

  public async findAll() {
    return ZTL.findAll();
  }

  public async findById(id: number) {
    return ZTL.findByPk(id);
  }

  public async update(id: number, data: any) {
    const ztl = await ZTL.findByPk(id);
    if (!ztl) {
      throw new Error('ZTL not found');
    }
    return ztl.update(data);
  }

  public async delete(id: number) {
    const ztl = await ZTL.findByPk(id);
    if (!ztl) {
      throw new Error('ZTL not found');
    }
    return ztl.destroy();
  }
}

export default new ztlDAO();
