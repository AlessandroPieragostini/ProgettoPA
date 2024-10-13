import express from 'express';
import pagamentoRoutes from './routes/pagamentoRoutes';
import creditoRoutes from './routes/creditoRoutes';
import {syncDb} from "./syncDB/dbSync";
import { errorHandler } from './middleware/errorHandlerMiddleware';

const app = express();


app.use(express.json());

// Avvio del server sulla porta 4000
app.listen(4000);

// Sincronizzazione del database
syncDb().then((): void => { console.log("\t--> SYNC DB DONE") });

// Rotte per la gestione dei pagamenti
app.use('/pagamento', pagamentoRoutes);

// Rotte per la gestione dei crediti
app.use('/crediti', creditoRoutes);

// Rotta di base per verificare che il backend sia attivo
app.get('/', (req, res) => {
    res.send('Backend per pagamenti e crediti!');
});

app.use(errorHandler);

export default app;
