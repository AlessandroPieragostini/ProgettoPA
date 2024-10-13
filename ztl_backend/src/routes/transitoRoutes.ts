import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware'; 
import { createTransito, getTransitiByVeicolo, getTransitiByVarco, getTransitoById, updateTransito, deleteTransito } from '../controllers/transitoController'; 
import { validateGetTransitoByVarco, validateCreateTransito, validateDeleteTransito, validateGetTransitoById, validateGetTransitoByVeicolo, validateUpdateTransito } from '../middleware/validate/transitoValidate';

const router = Router();

// Rotte per la gestione dei transiti
router.post('/', authenticateToken, authorizeRole(['operatore', 'varco']), validateCreateTransito, createTransito); // Crea un nuovo transito 
router.get('/veicolo/:targa', authenticateToken, authorizeRole(['operatore']), validateGetTransitoByVeicolo, getTransitiByVeicolo); // Ottieni transiti per un veicolo
router.get('/varco/:varcoId', authenticateToken, authorizeRole(['operatore']), validateGetTransitoByVarco, getTransitiByVarco); // Ottieni transiti per un varco
router.get('/:id', authenticateToken, authorizeRole(['operatore']), validateGetTransitoById, getTransitoById); // Ottieni un transito specifico
router.put('/:id', authenticateToken, authorizeRole(['operatore']), validateUpdateTransito, updateTransito); // Aggiorna un transito
router.delete('/:id', authenticateToken, authorizeRole(['operatore']), validateDeleteTransito, deleteTransito); // Elimina un transito

export default router;
