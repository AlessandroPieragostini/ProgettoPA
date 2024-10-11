import express from 'express';
import pagamentoRoutes from './routes/pagamentoRoutes';
import creditoRoutes from './routes/creditoRoutes';
import {syncDb} from "./syncDB/dbSync";
import { errorHandler } from './middleware/errorHandlerMiddleware';

const app = express();
app.use(express.json());

app.listen(4000)

// sync db
syncDb().then(():void=>{console.log("\t--> SYNC DB DONE")})

// Configura le rotte
// Rotte per i pagamenti
app.use('/pagamento', pagamentoRoutes);

// Rotte per la gestione del credito
app.use('/crediti', creditoRoutes); // Registriamo le nuove rotte

app.get('/', (req, res) => {
    res.send('Backend per pagamenti e crediti!');
});

// Middleware per la gestione degli errori
app.use(errorHandler);

export default app;

