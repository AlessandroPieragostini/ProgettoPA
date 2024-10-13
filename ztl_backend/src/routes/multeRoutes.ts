import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware'; 
import { checkMulte, downloadBolletino } from '../controllers/multeController'; 
import { validateCheckMulte, validateBollettino } from '../middleware/validate/multaValidate';

const router = Router();

// Rotte per la gestione delle multe
router.get('/:id', authenticateToken, authorizeRole(['utente']), validateCheckMulte, checkMulte); // Controlla le multe di un veicolo
router.get('/download/:id', authenticateToken, authorizeRole(['utente']), validateBollettino,downloadBolletino); // Scarica il bollettino della multa

export default router;
