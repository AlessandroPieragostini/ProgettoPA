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

const router = Router();

// Rotte per la gestione dei varchi
router.post('/', authenticateToken, authorizeRole(['operatore']), createVarco); // Crea un nuovo varco
router.get('/', authenticateToken, authorizeRole(['operatore', 'automobilista']), getVarchi); // Ottieni tutti i varchi
router.get('/:id', authenticateToken, authorizeRole(['operatore', 'automobilista']), getVarcoById); // Ottieni un varco specifico
router.put('/:id', authenticateToken, authorizeRole(['operatore']), updateVarco); // Aggiorna un varco
router.delete('/:id', authenticateToken, authorizeRole(['operatore']), deleteVarco); // Elimina un varco

export default router;
