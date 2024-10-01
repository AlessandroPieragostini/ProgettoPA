// src/models/Tariffa.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Tariffa extends Model {
  public idTariffa!: number;
  public tipoVeicolo!: string;
  public fasciaOraria!: string;
  public giornoFestivo!: boolean;
  public costo!: number;
}

Tariffa.init({
  idTariffa: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipoVeicolo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['elettrico', 'benzina', 'diesel', 'ibrido', 'moto', 'furgone']],
    },
  },
  fasciaOraria: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['giorno', 'notte', 'ore_punta']],
    },
  },
  giornoFestivo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Tariffa',
});

export default Tariffa;
