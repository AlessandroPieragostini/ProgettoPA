import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';
import Veicolo from './veicolo';
import Transito from './transito';

// Definizione del modello Multa, che rappresenta una multa nel sistema
class Multa extends Model {
  public id!: number;            
  public importo!: number;        
  public pagato!: boolean;        
  public targaVeicolo!: string;   
  public transitoId!: number;     
  public dataMulta!: Date;        
  public uuidPagamento!: string;  
}

// Creazione della connessione Sequelize per il modello Multa
const sequelize = SequelizeConnection.getInstance().sequelize;

// Inizializzazione del modello Multa con i suoi campi e configurazioni
Multa.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  importo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  pagato: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  targaVeicolo: {
    type: DataTypes.STRING,
    field: 'targa_veicolo',
    allowNull: false,
    references: {
      model: Veicolo,
      key: 'targa',
    },
  },
  transitoId: {
    type: DataTypes.INTEGER,
    field: 'transito_id',
    allowNull: false,
    references: {
      model: Transito,
      key: 'id',
    },
  },
  dataMulta: {
    type: DataTypes.DATE,
    field: 'data_multa',
    allowNull: false,
  },
  uuidPagamento: {
    type: DataTypes.UUID,
    field: 'uuid_pagamento',
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
}, {
  sequelize,
  modelName: 'Multa',
  tableName: 'multa',
  timestamps: true,          
  createdAt: 'created_at',   
  updatedAt: 'updated_at',   
});

// Definizione delle relazioni tra Multa e Veicolo
Veicolo.hasMany(Multa, { foreignKey: 'targaVeicolo' }); // Un veicolo può avere molte multe
Multa.belongsTo(Veicolo, { foreignKey: 'targaVeicolo' }); // Una multa appartiene a un veicolo

export default Multa;
