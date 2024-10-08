import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';

class Veicolo extends Model {
    public id!: number;
    public targa!: string;
    public tipo!: string;
}

const sequelize = SequelizeConnection.getInstance().sequelize;

Veicolo.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    targa: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Veicolo',
    tableName: 'veicoli',
});

export default Veicolo;
