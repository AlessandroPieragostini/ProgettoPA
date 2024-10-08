import { Model, DataTypes } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';

class ZTL extends Model {
  public id!: number;
  public nome!: string;
  public descrizione?: string;
  public orarioInizio!: string;
  public orarioFine!: string;
  public giorniAttivi!: string[];
  public createdAt!: Date;
  public updatedAt!: Date;
}

const sequelize = SequelizeConnection.getInstance().sequelize;

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
    giorniAttivi: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
