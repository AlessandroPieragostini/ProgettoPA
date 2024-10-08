import { Router } from 'express';
import PaymentController from '../controllers/PaymenentControllers';
import { authenticateToken } from '../middleware/AuthMiddleware';

const router = Router();

router.post('/pay', authenticateToken, PaymentController.payFine);
router.post('/recharge', authenticateToken, PaymentController.rechargeCredit);
router.get('/credit/:userId', authenticateToken, PaymentController.checkCredit);

export default router;
