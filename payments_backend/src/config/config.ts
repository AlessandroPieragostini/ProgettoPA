import dotenv from 'dotenv';

dotenv.config();

const config = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'my_user',
    password: process.env.DB_PASSWORD || 'my_password',
    dbname: process.env.DB_NAME || 'my_database',
  },
  jwtSecret: process.env.JWT_SECRET || 'secret_key',
  port: process.env.PORT || 3000,
};

export default config;
