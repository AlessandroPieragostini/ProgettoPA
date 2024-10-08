import express from 'express';
import ZTLRoutes from './routes/ztlRoutes';
import TransitoRoutes from './routes/transitoRoutes';
import MulteRoutes from './routes/multeRoutes';
import {syncDb} from "./syncDB/dbSync";

const app = express();
app.use(express.json());

app.listen(3000)

// sync db
syncDb().then(():void=>{console.log("\t--> SYNC DB DONE")})

// Configura le rotte
app.use('/api/ztl', ZTLRoutes);
app.use('/api/transito', TransitoRoutes);
app.use('/api/multe', MulteRoutes);
app.get('/', (req, res) => {
    res.send('Hello, World!!!!!');
});

export default app;
