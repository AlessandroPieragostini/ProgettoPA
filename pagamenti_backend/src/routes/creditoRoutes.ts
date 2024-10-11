import { Router } from 'express';
import { CreditoController } from '../controllers/creditoController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

// Rotta per ottenere il credito disponibile
router.get('/', authenticateToken, authorizeRole(['utente', 'operatore']), CreditoController.getCredito);

// Rotta protetta per ricaricare il credito (solo op)
router.put('/ricarica/:userId', authenticateToken, authorizeRole(['admin']), CreditoController.ricaricaCredito);

export default router;


