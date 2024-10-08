import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// Definizione dei campi opzionali per il Model User
interface UserAttributes {
    id: number;
    username: string;
    password: string;
    credit: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Definiamo i campi che possono essere opzionali alla creazione di un utente
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public credit!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Funzione per verificare la password hashata
    public validPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}

// Inizializziamo il modello User con le sue colonne
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
    hooks: {
        // Hook per hashare la password prima di salvare o aggiornare
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});

export default User;
