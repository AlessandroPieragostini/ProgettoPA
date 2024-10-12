// src/routes/varcoRoutes.ts

import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware'; // Importa i middleware per l'autenticazione e autorizzazione
import { 
  createVarco, 
  getVarchi, 
  getVarcoById, 
  updateVarco, 
  deleteVarco 
} from '../controllers/varcoController'; // Importa le funzioni dal VarcoController
import { 
  validateCreateVarco,
  validateDeleteVarco,
  validateGetVarco,
  validateUpdateVarco } from '../middleware/validate/varcoValidate';


const router = Router();

// Rotte per la gestione dei varchi
router.post('/crea_varco', authenticateToken, authorizeRole(['operatore']), validateCreateVarco, createVarco); // Crea un nuovo varco
router.get('/', authenticateToken, authorizeRole(['operatore', 'utente']), getVarchi); // Ottieni tutti i varchi
router.get('/:id', authenticateToken, authorizeRole(['operatore', 'utente']), validateGetVarco, getVarcoById); // Ottieni un varco specifico
router.put('/aggiorna_varco/:id', authenticateToken, authorizeRole(['operatore']), validateUpdateVarco, updateVarco); // Aggiorna un varco
router.delete('/elimina_varco/:id', authenticateToken, authorizeRole(['operatore']), validateDeleteVarco, deleteVarco); // Elimina un varco

export default router;
