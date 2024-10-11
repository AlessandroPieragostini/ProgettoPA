import { Router } from 'express';
import { PagamentoController } from '../controllers/pagamentoController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

// Rotta protetta per pagare una multa
router.put('/paga/:uuidPagamento', authenticateToken, authorizeRole(['utente','operatore']), PagamentoController.pagaMulta);
router.get('/ricevuta/:uuidPagamento', authenticateToken, authorizeRole(['utente','operatore']), PagamentoController.stampaRicevuta);
export default router;
