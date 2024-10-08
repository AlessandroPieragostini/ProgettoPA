import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class ZTL extends Model {
  public id!: number;
  public nome!: string;
  public descrizione?: string;
  public orarioInizio!: string;
  public orarioFine!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ZTL.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descrizione: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    orarioInizio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    orarioFine: {
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
  },
  {
    sequelize,
    modelName: 'ZTL',
    tableName: 'ztl',
    timestamps: true,
  }
);

export default ZTL;
