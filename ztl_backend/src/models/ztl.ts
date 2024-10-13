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

// Creazione della connessione Sequelize per il modello ZTL
const sequelize = SequelizeConnection.getInstance().sequelize;

// Inizializzazione del modello ZTL con i campi principali e la configurazione
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
      type: DataTypes.JSONB,
      field: 'giorni_attivi',
      allowNull: false,
      validate: {
        isValidDays(value: string[]) {
          const validDays = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
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
