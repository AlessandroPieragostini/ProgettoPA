// src/models/Transito.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Veicolo from './veicolo';
import VarcoZTL from './varco';

class Transito extends Model {
  public id!: number;
  public targaVeicolo!: string;
  public idVarco!: number;
  public dataOraTransito!: Date;
}

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
  tableName: 'transito'
});

Veicolo.hasMany(Transito, { foreignKey: 'veicoloId' });
Transito.belongsTo(Veicolo, { foreignKey: 'veicoloId' });

VarcoZTL.hasMany(Transito, { foreignKey: 'varcoId' });
Transito.belongsTo(VarcoZTL, { foreignKey: 'varcoId' });

export default Transito;
