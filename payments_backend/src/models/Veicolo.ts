import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/SequelizeConnection';

class Veicolo extends Model {
    public id!: number;
    public targa!: string;
    public tipo!: string;
}

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
