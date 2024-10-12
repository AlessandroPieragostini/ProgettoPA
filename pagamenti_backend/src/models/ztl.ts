import { Model, DataTypes } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';

// Definizione del modello ZTL
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

// Inizializzazione del modello ZTL
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
      field: 'orario_inizio', 
      allowNull: false,
    },
    orarioFine: {
      type: DataTypes.STRING,
      field: 'orario_fine',
      allowNull: false,
    },
    giorniAttivi: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
