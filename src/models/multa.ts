// src/models/Multa.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import Veicolo from './veicolo';

class Multa extends Model {
  public idMulta!: number;
  public targaVeicolo!: string;
  public importo!: number;
  public dataMulta!: Date;
  public pagato!: boolean;
  public uuidPagamento!: string;
}

Multa.init({
  idMulta: {
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
  importo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  dataMulta: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pagato: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  uuidPagamento: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
}, {
  sequelize,
  modelName: 'Multa',
});

export default Multa;
