import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

export default sequelize;

// import dotenv from 'dotenv';

// dotenv.config();

// export const development = {
//   username: process.env.DB_USER!,
//   password: process.env.DB_PASS!,
//   database: process.env.DB_NAME!,
//   host: process.env.DB_HOST!,
//   dialect: 'postgres',
// };

// export const test = {
//   username: process.env.DB_USER!,
//   password: process.env.DB_PASS!,
//   database: process.env.DB_NAME!,
//   host: process.env.DB_HOST!,
//   dialect: 'postgres',
// };

// export const production = {
//   username: process.env.DB_USER!,
//   password: process.env.DB_PASS!,
//   database: process.env.DB_NAME!,
//   host: process.env.DB_HOST!,
//   dialect: 'postgres',
// };
