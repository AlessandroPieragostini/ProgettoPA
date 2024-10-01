import { Router } from 'express';
import { 
  createTransito, 
  getTransitiByVeicolo, 
  getTransitoById, 
  deleteTransito, 
  updateTransito 
} from '../controllers/transitoController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Rotte CRUD per la gestione dei transiti
router.post('/', createTransito); // Inserimento transito
router.get('/:id', authMiddleware, getTransitoById); // Ottieni transito per ID
router.put('/:id', authMiddleware, updateTransito); // Aggiorna transito
router.delete('/:id', authMiddleware, deleteTransito); // Elimina transito

export default router;
