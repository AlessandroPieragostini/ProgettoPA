import { DataTypes, Model } from 'sequelize';
import ZTL from './ztl';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';

// Definizione del modello Varco
class Varco extends Model {
  public id!: number;
  public location!: string;
  public ztlId!: number;
}

// Creazione della connessione Sequelize per il modello Varco
const sequelize = SequelizeConnection.getInstance().sequelize;

// Inizializzazione del modello Varco con i campi principali e la configurazione
Varco.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ztlId: {
    type: DataTypes.INTEGER,
    field: 'ztl_id',
    allowNull: false,
    references: {
      model: ZTL,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Varco',
  tableName: 'varco',
  timestamps: true,
  createdAt: 'created_at', 
  updatedAt: 'updated_at',
});

// Definizione delle relazioni tra Varco e ZTL
Varco.belongsTo(ZTL, { foreignKey: 'ztlId', as: 'ztl' });
ZTL.hasMany(Varco, { foreignKey: 'ztlId', as: 'varchi' });

export default Varco;
