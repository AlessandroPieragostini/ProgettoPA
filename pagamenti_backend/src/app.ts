import express from 'express';
import pagamentoRoutes from './routes/pagamentoRoutes';
import creditoRoutes from './routes/creditoRoutes';
import {syncDb} from "./syncDB/dbSync";

const app = express();
app.use(express.json());

app.listen(3000)

// sync db
syncDb().then(():void=>{console.log("\t--> SYNC DB DONE")})

// Configura le rotte
// Rotte per i pagamenti
app.use('/api/pagamenti', pagamentoRoutes);

// Rotte per la gestione del credito
app.use('/api/crediti', creditoRoutes); // Registriamo le nuove rotte

app.get('/', (req, res) => {
    res.send('Hello, World!!!!!');
});

export default app;

