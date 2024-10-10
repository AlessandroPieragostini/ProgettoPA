// src/models/Veicolo.ts
import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';

class Veicolo extends Model {
  public targa!: string;
  public tipoVeicolo!: string;
}

const sequelize = SequelizeConnection.getInstance().sequelize;

Veicolo.init({
  targa: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  tipoVeicolo: {
    type: DataTypes.STRING,
    field: 'tipo_veicolo',
    allowNull: false,
    validate: {
      isIn: [['elettrico', 'benzina', 'diesel', 'ibrido', 'moto', 'furgone']],
    },
  },
}, {
  sequelize,
  modelName: 'Veicolo',
  tableName: 'veicolo',
  timestamps: true,
  createdAt: 'created_at', 
  updatedAt: 'updated_at',
});

export default Veicolo;
