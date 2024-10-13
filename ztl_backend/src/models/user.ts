import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';
import { UserRole } from "../static";

// Definizione del modello User
export default class User extends Model {
  declare id: number;  
  declare username: string;  
  declare email: string;
  declare token: number;
  declare role: string;
  declare credit: number;
}

// Creazione della connessione Sequelize per il modello User
const sequelize = SequelizeConnection.getInstance().sequelize;

// Inizializzazione del modello User con i campi principali e la configurazione
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
        type: DataTypes.ENUM,
        values: Object.values(UserRole),
        allowNull: false,
        defaultValue: UserRole.USER
    },
    credit: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    underscored: true,
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
  },
);
