// src/models/Whitelist.ts
import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';
import Veicolo from './veicolo';

class Whitelist extends Model {
  public targaVeicolo!: string;
  public dataScadenza!: Date | null;
}

const sequelize = SequelizeConnection.getInstance().sequelize;

Whitelist.init({
  targaVeicolo: {
    type: DataTypes.STRING,
    field: 'targa_veicolo',
    primaryKey: true,
    references: {
      model: Veicolo,
      key: 'targa',
    },
  },
  dataScadenza: {
    type: DataTypes.DATE,
    field: 'data_scadenza',
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Whitelist',
  tableName: 'whitelist',
  timestamps: true,
  createdAt: 'created_at', 
  updatedAt: 'updated_at',
});

export default Whitelist;
