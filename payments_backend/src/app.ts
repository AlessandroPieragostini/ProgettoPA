import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import sequelize from './config/database';
import pagamentiRoutes from './routes/pagamentiRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/api', pagamentiRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
