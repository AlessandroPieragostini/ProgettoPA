import express from 'express';
import ZTLRoutes from './routes/ztlRoutes';
import VarcoRoutes from './routes/varcoRoutes'
import TransitoRoutes from './routes/transitoRoutes';
import MulteRoutes from './routes/multeRoutes';
import {syncDb} from "./syncDB/dbSync";
import loginRoutes from './routes/loginRoutes';
import { errorHandler } from './middleware/errorHandlerMiddleware';

const app = express();
app.use(express.json());

app.listen(3000)

// Sync con il db
syncDb().then(():void=>{console.log("\t--> SYNC DB DONE")})

// Configura le rotte
app.use('/ztl', ZTLRoutes);
app.use('/varco', VarcoRoutes);
app.use('/transito', TransitoRoutes);
app.use('/multe', MulteRoutes);
app.use('/login', loginRoutes)
app.get('/', (req, res) => {
    res.send('Backend dei transiti!');
});

// Middleware per la gestione degli errori
app.use(errorHandler);

export default app;
