import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Credito extends Model {
  public id!: number; // Identificativo unico
  public utenteId!: number; // ID dell'utente a cui appartiene il credito
  public importo!: number; // Importo disponibile
}

Credito.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    utenteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    importo: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Credito',
  }
);

export default Credito;