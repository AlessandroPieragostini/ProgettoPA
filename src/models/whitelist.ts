// src/models/Whitelist.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import Veicolo from './veicolo';

class Whitelist extends Model {
  public targaVeicolo!: string;
  public dataScadenza!: Date | null;
}

Whitelist.init({
  targaVeicolo: {
    type: DataTypes.STRING,
    primaryKey: true,
    references: {
      model: Veicolo,
      key: 'targa',
    },
  },
  dataScadenza: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Whitelist',
});

export default Whitelist;
