// src/models/Multa.ts
import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';
import Veicolo from './veicolo';


class Multa extends Model {
  public id!: number;
  public targaVeicolo!: string;
  public importo!: number;
  public dataMulta!: Date;
  public pagato!: boolean;
  public uuidPagamento!: string;
}

const sequelize = SequelizeConnection.getInstance().sequelize;

Multa.init({
  id: {
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
  tableName: 'multa'
});

Veicolo.hasMany(Multa, { foreignKey: 'targaVeicolo' });
Multa.belongsTo(Veicolo, { foreignKey: 'targaVeicolo' });

export default Multa;
