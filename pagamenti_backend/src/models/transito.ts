import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';
import Veicolo from './veicolo';
import VarcoZTL from './varco';

// Definizione di un modello che rappresenta un transito di un veicolo attraverso un varco ZTL
class Transito extends Model {
  public id!: number;             
  public targaVeicolo!: string;   
  public varcoId!: number;        
  public dataOraTransito!: Date;  
}


const sequelize = SequelizeConnection.getInstance().sequelize;


Transito.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  varcoId: {
    type: DataTypes.INTEGER,
    field: 'varco_id',
    allowNull: false,
    references: {
      model: VarcoZTL,
      key: 'id',
    },
  },
  dataOraTransito: {
    type: DataTypes.DATE,
    field: 'data_ora_transito',
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Transito',
  tableName: 'transito',
  timestamps: true,          
  createdAt: 'created_at',   
  updatedAt: 'updated_at',   
});

// Relazione tra Veicolo e Transito: un veicolo può avere molti transiti
Veicolo.hasMany(Transito, { foreignKey: 'targaVeicolo' });

// Relazione tra Transito e Veicolo: un transito appartiene a un veicolo
Transito.belongsTo(Veicolo, { foreignKey: 'targaVeicolo' });

// Relazione tra VarcoZTL e Transito: un varco può registrare molti transiti
VarcoZTL.hasMany(Transito, { foreignKey: 'varcoId' });

// Relazione tra Transito e VarcoZTL: un transito appartiene a un varco
Transito.belongsTo(VarcoZTL, { foreignKey: 'varcoId' });

export default Transito;

