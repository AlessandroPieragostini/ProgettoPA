import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Pagamento extends Model {
  public id!: number; // Identificativo unico
  public multaId!: number; // ID della multa pagata
  public utenteId!: number; // ID dell'utente che effettua il pagamento
  public uuidPagamento!: string; // UUID associato al pagamento
  public importo!: number; // Importo pagato
}

Pagamento.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    multaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    utenteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uuidPagamento: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    importo: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Pagamento',
  }
);

export default Pagamento;
