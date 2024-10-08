import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../syncDB/SequelizeConnection';

class Multa extends Model {
    public id!: number;
    public veicoloId!: number;
    public importo!: number;
    public pagamentoEffettuato!: boolean;
}

const sequelize = SequelizeConnection.getInstance().sequelize;

Multa.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    veicoloId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    importo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    pagamentoEffettuato: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize,
    modelName: 'Multa',
    tableName: 'multe',
});

export default Multa;
