import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../syncDB/SequelizeConnection';

class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public credit!: number;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    credit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
});

export default User;
