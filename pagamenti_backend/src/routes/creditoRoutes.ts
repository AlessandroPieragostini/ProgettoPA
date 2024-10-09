import { Router } from 'express';
import { CreditoController } from '../controllers/creditoController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

// Rotta protetta per ricaricare il credito (solo admin)
router.put('/ricarica/:userId', authenticateToken, authorizeRole(['operatore']), CreditoController.ricaricaCredito);

export default router;
