// src/models/Veicolo.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Veicolo extends Model {
  public targa!: string;
  public tipoVeicolo!: string;
}

Veicolo.init({
  targa: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  tipoVeicolo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['elettrico', 'benzina', 'diesel', 'ibrido', 'moto', 'furgone']],
    },
  },
}, {
  sequelize,
  modelName: 'Veicolo',
});

export default Veicolo;
