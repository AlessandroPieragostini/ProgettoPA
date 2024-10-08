import express from 'express';
import ZTLRoutes from './routes/ztlRoutes';
import VarcoRoutes from './routes/varcoRoutes'
import TransitoRoutes from './routes/transitoRoutes';
import MulteRoutes from './routes/multeRoutes';
import {syncDb} from "./syncDB/dbSync";

const app = express();
app.use(express.json());

app.listen(3000)

// sync db
syncDb().then(():void=>{console.log("\t--> SYNC DB DONE")})

// Configura le rotte
app.use('/ztl', ZTLRoutes);
app.use('/varco', VarcoRoutes);
app.use('/transito', TransitoRoutes);
app.use('/multe', MulteRoutes);
app.get('/', (req, res) => {
    res.send('Hello, World!!!!!');
});

export default app;
