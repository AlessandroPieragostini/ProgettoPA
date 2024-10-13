import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';
import Veicolo from './veicolo';

// Definizione del modello Whitelist
class Whitelist extends Model {
  public targaVeicolo!: string;
  public dataScadenza!: Date | null;
}

// Creazione della connessione Sequelize per il modello Whitelist
const sequelize = SequelizeConnection.getInstance().sequelize;

// Inizializzazione del modello Whitelist con i campi principali e la configurazione
Whitelist.init({
  targaVeicolo: {
    type: DataTypes.STRING,
    field: 'targa_veicolo',
    primaryKey: true,
    references: {
      model: Veicolo,
      key: 'targa',
    },
  },
  dataScadenza: {
    type: DataTypes.DATE,
    field: 'data_scadenza',
    allowNull: true, 
  },
}, {
  sequelize,
  modelName: 'Whitelist',
  tableName: 'whitelist',
  timestamps: true,
  createdAt: 'created_at', 
  updatedAt: 'updated_at',
});

export default Whitelist;
