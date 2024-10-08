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
router.post('/', authenticateToken, authorizeRole(['operatore']), createZTL);
router.get('/', authenticateToken, authorizeRole(['operatore', 'utente']), getZTLs);
router.get('/:id', authenticateToken, authorizeRole(['operatore']), getZTLById);
router.put('/:id', authenticateToken, authorizeRole(['operatore']), updateZTL);
router.delete('/:id', authenticateToken, authorizeRole(['operatore']), deleteZTL);

export default router;


// // src/routes/ztlRoutes.ts
// import { Router } from 'express';
// import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';
// import ZtlController from '../controllers/ztlController';

// const router = Router();

// // CRUD per la gestione delle ZTL
// router.post('/', authenticateToken, authorizeRole(['operatore']), ZtlController.createZtl);
// router.get('/', authenticateToken, authorizeRole(['operatore', 'automobilista']), ZtlController.getAllZtl);
// router.get('/:id', authenticateToken, authorizeRole(['operatore']), ZtlController.getZtlById);
// router.put('/:id', authenticateToken, authorizeRole(['operatore']), ZtlController.updateZtl);
// router.delete('/:id', authenticateToken, authorizeRole(['operatore']), ZtlController.deleteZtl);

// export default router;
