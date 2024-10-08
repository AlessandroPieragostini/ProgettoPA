import { DataTypes, Model } from 'sequelize';

class Multa extends Model {
    public id!: number;
    public veicoloId!: number;
    public importo!: number;
    public pagamentoEffettuato!: boolean;
}

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
