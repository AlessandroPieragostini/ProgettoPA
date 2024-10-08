import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres', // O MySQL/SQLite a seconda del DB che stai usando
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
