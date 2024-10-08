// src/models/Veicolo.ts
import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';

class Veicolo extends Model {
  public targa!: string;
  public tipoVeicolo!: string;
}

const sequelize = SequelizeConnection.getInstance().sequelize;

Veicolo.init({
  targa: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  tipoVeicolo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['elettrico', 'benzina', 'diesel', 'ibrido', 'moto', 'furgone']],
    },
  },
}, {
  sequelize,
  modelName: 'Veicolo',
  tableName: 'veicolo'
});

export default Veicolo;
