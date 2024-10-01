import { Router } from 'express';
import { 
  checkMulte, 
  downloadBolletino, 
  payMulta 
} from '../controllers/multeController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Rotte per la gestione delle multe
router.get('/check', authMiddleware, checkMulte); // Verifica multe a carico dell'automobilista
router.get('/bollettino/:id', authMiddleware, downloadBolletino); // Scarica bollettino di pagamento
router.post('/pay', authMiddleware, payMulta); // Effettua pagamento

export default router;
