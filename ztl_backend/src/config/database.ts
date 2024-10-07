import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import Multa from '../models/multa'
import Tariffa from '../models/tariffa';
import Transito from '../models/transito';
import Veicolo from '../models/veicolo';
import Whitelist from '../models/whitelist';
import VarcoZTL from '../models/varcoZTL';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS! as string, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

export default sequelize;

// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const config = {
//   development: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//   },
//   test: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//   },
//   production: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//   },
// };

// // Exporta la configurazione
// export default config;
