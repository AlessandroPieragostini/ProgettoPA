// src/models/Multa.ts
import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';
import Veicolo from './veicolo';
import Transito from './transito';


class Multa extends Model {
  public id!: number;
  public importo!: number;
  public pagato!: boolean;
  public targaVeicolo!: string;
  public transitoId!: number;
  public dataMulta!: Date;
  public uuidPagamento!: string;
}

const sequelize = SequelizeConnection.getInstance().sequelize;

Multa.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  importo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  pagato: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  targaVeicolo: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Veicolo,
      key: 'targa',
    },
  },
  transitoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Transito,
      key: 'id',
    },
  },
  dataMulta: {
    type: DataTypes.DATE,
    allowNull: false,
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
