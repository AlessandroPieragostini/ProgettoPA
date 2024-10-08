import express from 'express';
import paymentRoutes from './routes/PaymentRoutes';
import checkJWT from './middleware/AuthMiddleware';
import database from './config/database';



const app = express();
app.use(express.json());

// Rotte per i pagamenti
app.use('/payments', checkJWT, paymentRoutes);

app.listen(database.port, () => {
    console.log(`Server in esecuzione sulla porta ${database.port}`);
});

export default app;
