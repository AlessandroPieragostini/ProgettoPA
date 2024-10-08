import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';
import { UserRole } from "../static";

export default class User extends Model {

  declare id: number;
  
  declare username: string;
  
  declare email: string;

  declare token: number;

  declare role: string;

  declare credit: number;

}

const sequelize = SequelizeConnection.getInstance().sequelize;

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
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    role: {
        type: DataTypes.ENUM,
        values: Object.values(UserRole),
        allowNull: false,
        defaultValue: UserRole.USER
    },
    credit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
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


