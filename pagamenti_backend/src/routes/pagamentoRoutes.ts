import { Router } from 'express';
import { PagamentoController } from '../controllers/pagamentoController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';
import { validatePagaMulta, validateStampaRicevuta } from '../middleware/validate/pagamentoValidate';

const router = Router();

// Rotta protetta per pagare una multa
router.put('/:uuidPagamento', authenticateToken, authorizeRole(['utente']), validatePagaMulta, PagamentoController.pagaMulta);
router.get('/ricevuta/:uuidPagamento', authenticateToken, authorizeRole(['utente']), validateStampaRicevuta, PagamentoController.stampaRicevuta);
export default router;
