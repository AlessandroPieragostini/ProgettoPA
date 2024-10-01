import { Router } from 'express';
import { 
  createZTL, 
  getZTLs, 
  getZTLById, 
  updateZTL, 
  deleteZTL 
} from '../controllers/ztlController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Rotte CRUD per la gestione delle ZTL
router.post('/', authMiddleware, createZTL); // Crea ZTL
router.get('/', getZTLs); // Ottieni tutte le ZTL
router.get('/:id', getZTLById); // Ottieni ZTL per ID
router.put('/:id', authMiddleware, updateZTL); // Aggiorna ZTL
router.delete('/:id', authMiddleware, deleteZTL); // Elimina ZTL

export default router;
