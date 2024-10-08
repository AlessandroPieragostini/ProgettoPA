import express from 'express';
import { checkJWT } from '../middleware/AuthMiddleware';
import { rechargeCredit, checkCredit, payFine, downloadReceipt } from '../controllers/PaymenentControllers';

const router = express.Router();

// Ricarica credito (solo admin)
router.post('/recharge', checkJWT, rechargeCredit);

// Verifica credito utente
router.get('/check-credit', checkJWT, checkCredit);

// Pagamento multa
router.post('/pay-fine', checkJWT, payFine);

// Download ricevuta
router.get('/download-receipt/:uuid', checkJWT, downloadReceipt);

export default router;
