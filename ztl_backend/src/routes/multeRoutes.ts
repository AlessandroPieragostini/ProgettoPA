// src/routes/multeRoutes.ts

import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware'; // Importa i middleware per l'autenticazione e autorizzazione
import { 
  checkMulte, 
  downloadBolletino, 
  payMulta 
} from '../controllers/multeController'; // Importa le funzioni dal MulteController

const router = Router();

// Rotte per la gestione delle multe
router.get('/:id', authenticateToken, authorizeRole(['automobilista', 'operatore']), checkMulte); // Controlla le multe di un veicolo
router.get('/download/:id', authenticateToken, authorizeRole(['automobilista', 'operatore']), downloadBolletino); // Scarica il bollettino della multa
router.post('/pay', authenticateToken, authorizeRole(['automobilista']), payMulta); // Paga una multa

export default router;
