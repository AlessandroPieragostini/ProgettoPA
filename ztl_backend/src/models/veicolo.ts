import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';
import User from './user';

// Definizione del modello Veicolo
class Veicolo extends Model {
  public targa!: string;
  public utenteId!: number;
  public tipoVeicolo!: string;
}

// Creazione della connessione Sequelize per il modello Veicolo
const sequelize = SequelizeConnection.getInstance().sequelize;

// Inizializzazione del modello Veicolo con i campi principali e la configurazione
Veicolo.init({
  targa: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  utenteId: {
    type: DataTypes.INTEGER,
    field: 'utente_id',
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  tipoVeicolo: {
    type: DataTypes.STRING,
    field: 'tipo_veicolo',
    allowNull: false,
    validate: {
      isIn: [['elettrico', 'benzina', 'diesel', 'ibrido', 'moto', 'furgone']],
    },
  },
}, {
  sequelize,
  modelName: 'Veicolo',
  tableName: 'veicolo',
  timestamps: true,
  createdAt: 'created_at', 
  updatedAt: 'updated_at',
});

// Definizione delle relazioni tra Veicolo e User
User.hasMany(Veicolo, { foreignKey: 'utenteId' });
Veicolo.belongsTo(User, { foreignKey: 'utenteId' });

export default Veicolo;
