import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; 
import { User } from './User'; 

export class Fine extends Model {
  public id!: number;
  public licensePlate!: string;
  public amount!: number;
  public paid!: boolean;
  public paymentUuid!: string | null;
  public userId!: number; // Relazione con l'utente
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Fine.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  licensePlate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  paymentUuid: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Assume esiste un modello User
      key: 'id',
    },
  },
}, {
  sequelize, // Collegamento al DB configurato
  modelName: 'Fine',
  tableName: 'fines',
});

User.hasMany(Fine, { foreignKey: 'userId', as: 'fines' });
Fine.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Fine;