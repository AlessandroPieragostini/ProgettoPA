// src/models/Transito.ts
import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';
import Veicolo from './veicolo';
import VarcoZTL from './varco';

class Transito extends Model {
  public id!: number;
  public targaVeicolo!: string;
  public varcoId!: number;
  public dataOraTransito!: Date;
}

const sequelize = SequelizeConnection.getInstance().sequelize;

Transito.init({
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
  varcoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: VarcoZTL,
      key: 'id',
    },
  },
  dataOraTransito: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Transito',
  tableName: 'transito'
});

Veicolo.hasMany(Transito, { foreignKey: 'veicoloId' });
Transito.belongsTo(Veicolo, { foreignKey: 'veicoloId' });

VarcoZTL.hasMany(Transito, { foreignKey: 'varcoId' });
Transito.belongsTo(VarcoZTL, { foreignKey: 'varcoId' });

export default Transito;
