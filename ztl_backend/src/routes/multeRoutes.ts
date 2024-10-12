// src/routes/multeRoutes.ts

import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware'; // Importa i middleware per l'autenticazione e autorizzazione
import { 
  checkMulte, 
  downloadBolletino, 
} from '../controllers/multeController'; // Importa le funzioni dal MulteController
import { validateCheckMulteRequests, validateBollettinoRequests } from '../middleware/validate/multaValidate';

const router = Router();

// Rotte per la gestione delle multe
router.get('/:id', authenticateToken, authorizeRole(['utente', 'operatore']), validateCheckMulteRequests, checkMulte); // Controlla le multe di un veicolo
router.get('/download/:id', authenticateToken, authorizeRole(['utente', 'operatore']), validateBollettinoRequests,downloadBolletino); // Scarica il bollettino della multa

export default router;
