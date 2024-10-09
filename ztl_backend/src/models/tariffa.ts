// src/models/Tariffa.ts
import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';

class Tariffa extends Model {
  public id!: number;
  public tipoVeicolo!: string;
  public fasciaOraria!: string;
  public giornoFestivo!: boolean;
  public costo!: number;
}

const sequelize = SequelizeConnection.getInstance().sequelize;

Tariffa.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipoVeicolo: {
    type: DataTypes.STRING,
    field: 'tipo_veicolo',
    allowNull: false,
    validate: {
      isIn: [['elettrico', 'benzina', 'diesel', 'ibrido', 'moto', 'furgone']],
    },
  },
  fasciaOraria: {
    type: DataTypes.STRING,
    field: 'fascia_oraria',
    allowNull: false,
    validate: {
      isIn: [['giorno', 'notte', 'ore_punta']],
    },
  },
  giornoFestivo: {
    type: DataTypes.BOOLEAN,
    field: 'giorno_festivo',
    allowNull: false,
  },
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Tariffa',
  tableName: 'tariffa',
  timestamps: true,
  createdAt: 'created_at', 
  updatedAt: 'updated_at',
});

export default Tariffa;
