import { DataTypes, Model } from 'sequelize';
import ZTL from './ztl';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';

// Definizione del modello Varco, che rappresenta un varco ZTL
class Varco extends Model {
  public id!: number;
  public location!: string;
  public ztlId!: number;
}

const sequelize = SequelizeConnection.getInstance().sequelize;

// Definizione del modello Varco, che rappresenta un varco ZTL
Varco.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ztlId: {
    type: DataTypes.INTEGER,
    field: 'ztl_id',
    allowNull: false,
    references: {
      model: ZTL,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Varco',
  tableName: 'varco',
  timestamps: true,
  createdAt: 'created_at', 
  updatedAt: 'updated_at',
});

// Definizione delle relazioni tra Varco e ZTL
Varco.belongsTo(ZTL, { foreignKey: 'ztlId', as: 'ztl' });
ZTL.hasMany(Varco, { foreignKey: 'ztlId', as: 'varchi' });

export default Varco;
