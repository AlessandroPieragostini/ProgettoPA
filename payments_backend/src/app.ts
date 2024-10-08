import express from 'express';
import paymentRoutes from './routes/PaymentRoutes';
import { authenticateToken } from './middleware/AuthMiddleware';
import config from './config/config';

const app = express();
app.use(express.json());

// Rotte per i pagamenti
app.use('/payments', authenticateToken, paymentRoutes);

app.listen(config.port, () => {
    console.log(`Server in esecuzione sulla porta ${config.port}`);
});

export default app;
