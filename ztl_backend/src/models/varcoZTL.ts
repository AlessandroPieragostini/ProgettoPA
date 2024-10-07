// src/models/VarcoZTL.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class VarcoZTL extends Model {
  public idVarco!: number;
  public nomeVarco!: string;
  public orarioApertura!: string;
  public orarioChiusura!: string;
  public giornoSettimana!: string;
}

VarcoZTL.init({
  idVarco: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nomeVarco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orarioApertura: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  orarioChiusura: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  giornoSettimana: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]],
    },
  },
}, {
  sequelize,
  modelName: 'VarcoZTL',
  tableName: 'ztl'
});

export default VarcoZTL;
