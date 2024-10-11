import ZTL from '../models/ztl';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; // Importa la fabbrica degli errori

class ztlDAO {
  public async create(data: any) {
    return ZTL.create(data);
  }

  public async findAll() {
    return ZTL.findAll();
  }

  public async findById(id: number) {
    const ztl = await ZTL.findByPk(id);
    if (!ztl) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'ZTL non trovata');
    }
    return ztl;
  }

  public async update(id: number, data: any) {
    const ztl = await ZTL.findByPk(id);
    if (!ztl) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'ZTL non trovata');
    }
    return ztl.update(data);
  }

  public async delete(id: number) {
    const ztl = await ZTL.findByPk(id);
    if (!ztl) {
      throw ErrorFactory.createError(ErrorTypes.NotFound, 'ZTL non trovata');
    }
    await ztl.destroy();
    return true;
  }
}

export default new ztlDAO();
