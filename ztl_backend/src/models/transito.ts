// src/models/Transito.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Veicolo from './veicolo';
import VarcoZTL from './ZTL';

class Transito extends Model {
  public idTransito!: number;
  public targaVeicolo!: string;
  public idVarco!: number;
  public dataOraTransito!: Date;
}

Transito.init({
  idTransito: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  targaVeicolo: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Veicolo,
      key: 'targa',
    },
  },
  idVarco: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: VarcoZTL,
      key: 'idVarco',
    },
  },
  dataOraTransito: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Transito',
});

export default Transito;
