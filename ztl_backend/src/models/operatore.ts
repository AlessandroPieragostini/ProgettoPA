import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Operatore extends Model {}

Operatore.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: DataTypes.STRING,
  cognome: DataTypes.STRING,
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Operatore',
});

export default Operatore;
