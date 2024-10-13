import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware'; 
import { checkMulte, downloadBolletino } from '../controllers/multeController'; 
import { validateCheckMulteRequests, validateBollettinoRequests } from '../middleware/validate/multaValidate';

const router = Router();

// Rotte per la gestione delle multe
router.get('/:id', authenticateToken, authorizeRole(['utente']), validateCheckMulteRequests, checkMulte); // Controlla le multe di un veicolo
router.get('/download/:id', authenticateToken, authorizeRole(['utente']), validateBollettinoRequests,downloadBolletino); // Scarica il bollettino della multa

export default router;
