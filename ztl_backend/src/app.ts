import express from 'express';
import ZTLRoutes from './routes/ztlRoutes';
import TransitoRoutes from './routes/transitoRoutes';
import MulteRoutes from './routes/multeRoutes';

const app = express();
app.use(express.json());

app.listen(3000)

// Configura le rotte
app.use('/api/ztl', ZTLRoutes);
app.use('/api/transito', TransitoRoutes);
app.use('/api/multe', MulteRoutes);

export default app;
