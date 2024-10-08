// src/models/VarcoZTL.ts
import { DataTypes, Model } from 'sequelize';
import ZTL from './ztl';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';

class Varco extends Model {
  public id!: number;
  public nomeVarco!: string;
  public ztlId!: number;
  public orarioChiusura!: string;
  public giornoSettimana!: string;
}

const sequelize = SequelizeConnection.getInstance().sequelize;

Varco.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  locazione: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ztlId: {
    type: DataTypes.NUMBER,
    allowNull: false,
    references: {
      model: ZTL, // Nome del modello ZTL
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Varco',
  tableName: 'varco'
});

Varco.belongsTo(ZTL, { foreignKey: 'ztlId', as: 'ztl' });
ZTL.hasMany(Varco, { foreignKey: 'ztlId', as: 'varchi' });

export default Varco;
