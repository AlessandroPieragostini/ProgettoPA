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
      type: DataTypes.STRING,
      field: 'orario_inizio', // Specifica il campo nel database
      allowNull: false,
    },
    orarioFine: {
      type: DataTypes.STRING,
      field: 'orario_fine', // Specifica il campo nel database
      allowNull: false,
    },
    giorniAttivi: {
      type: DataTypes.JSONB,
      field: 'giorni_attivi',
      allowNull: false,
      validate: {
        isValidDays(value: string[]) {
          const validDays = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
          // Verifica se ogni giorno nell'array è valido
          for (const day of value) {
            if (!validDays.includes(day)) {
              console.error(`Il giorno "${day}" non è valido. Deve essere uno dei seguenti: ${validDays.join(', ')}`);
              throw new Error(`Errore di validazione: giorni non validi.`);
            }
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'ZTL',
    tableName: 'ztl',
    timestamps: true,
    createdAt: 'created_at', 
    updatedAt: 'updated_at',
  }
);

export default ZTL;
