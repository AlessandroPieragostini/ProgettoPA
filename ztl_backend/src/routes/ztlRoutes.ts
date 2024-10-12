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
  validateUpdateZtl } from '../middleware/validate/ztlValidate';

const router = Router();

// Rotte CRUD per la gestione delle ZTL
router.post('/crea_ztl', authenticateToken, authorizeRole(['operatore']), validateCreateZtl, createZTL);
router.get('/', authenticateToken, authorizeRole(['operatore', 'utente']), getZTLs);
router.get('/:id', authenticateToken, authorizeRole(['operatore', 'utente']), validateGetZtl, getZTLById);
router.put('/aggiorna_ztl/:id', authenticateToken, authorizeRole(['operatore']), validateUpdateZtl, updateZTL);
router.delete('/elimina_ztl/:id', authenticateToken, authorizeRole(['operatore']), validateDeleteZtl, deleteZTL);

export default router;



