import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware'; 
import { createVarco, getVarchi, getVarcoById, updateVarco, deleteVarco } from '../controllers/varcoController'; 
import { validateCreateVarco, validateDeleteVarco, validateGetVarco, validateUpdateVarco } from '../middleware/validate/varcoValidate';
const router = Router();

// Rotte per la gestione dei varchi
router.post('/', authenticateToken, authorizeRole(['operatore']), validateCreateVarco, createVarco); // Crea un nuovo varco
router.get('/', authenticateToken, authorizeRole(['operatore']), getVarchi); // Ottieni tutti i varchi
router.get('/:id', authenticateToken, authorizeRole(['operatore']), validateGetVarco, getVarcoById); // Ottieni un varco specifico
router.put('/:id', authenticateToken, authorizeRole(['operatore']), validateUpdateVarco, updateVarco); // Aggiorna un varco
router.delete('/:id', authenticateToken, authorizeRole(['operatore']), validateDeleteVarco, deleteVarco); // Elimina un varco

export default router;
