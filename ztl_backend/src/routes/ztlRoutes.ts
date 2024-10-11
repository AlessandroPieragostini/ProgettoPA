import { Router } from 'express';
import { 
  createZTL, 
  getZTLs, 
  getZTLById, 
  updateZTL, 
  deleteZTL 
} from '../controllers/ztlController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

// Rotte CRUD per la gestione delle ZTL
router.post('/crea_ztl', authenticateToken, authorizeRole(['operatore']), createZTL);
router.get('/', authenticateToken, authorizeRole(['operatore', 'utente']), getZTLs);
router.get('/:id', authenticateToken, authorizeRole(['operatore', 'utente']), getZTLById);
router.put('/aggiorna_ztl/:id', authenticateToken, authorizeRole(['operatore']), updateZTL);
router.delete('/elimina_ztl/:id', authenticateToken, authorizeRole(['operatore']), deleteZTL);

export default router;



