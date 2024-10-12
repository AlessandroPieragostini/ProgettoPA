import { Router } from 'express';
import { 
  createZTL, 
  getZTLs, 
  getZTLById, 
  updateZTL, 
  deleteZTL 
} from '../controllers/ztlController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';
import { 
  validateGetZtl,
  validateCreateZtl,
  validateDeleteZtl,
  validateUpdateZtl 
} from '../middleware/validate/ztlValidate';

const router = Router();

// Rotte CRUD per la gestione delle ZTL
router.post('/', authenticateToken, authorizeRole(['operatore']), validateCreateZtl, createZTL); // Crea una nuova ZTL
router.get('/', authenticateToken, authorizeRole(['operatore']), getZTLs); // Ottieni tutte le ZTL
router.get('/:id', authenticateToken, authorizeRole(['operatore']), validateGetZtl, getZTLById); // Ottieni una ZTL specifica
router.put('/:id', authenticateToken, authorizeRole(['operatore']), validateUpdateZtl, updateZTL); // Aggiorna una ZTL
router.delete('/:id', authenticateToken, authorizeRole(['operatore']), validateDeleteZtl, deleteZTL); // Elimina una ZTL

export default router;
