// src/routes/transitoRoutes.ts

import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware'; // Importa i middleware per l'autenticazione e autorizzazione
import { 
  createTransito, 
  getTransitiByVeicolo, 
  getTransitiByVarco, 
  getTransitoById, 
  updateTransito, 
  deleteTransito 
} from '../controllers/transitoController'; // Importa le funzioni dal TransitoController

const router = Router();

// Rotte per la gestione dei transiti
router.post('/', authenticateToken, authorizeRole(['operatore', 'varco']), createTransito); // Crea un nuovo transito NB!! deve poterlo creare anche il varco
router.get('/veicolo/:targa', authenticateToken, authorizeRole(['operatore', 'utente']), getTransitiByVeicolo); // Ottieni transiti per un veicolo
router.get('/varco/:varcoId', authenticateToken, authorizeRole(['operatore']), getTransitiByVarco); // Ottieni transiti per un varco
router.get('/:id', authenticateToken, authorizeRole(['operatore']), getTransitoById); // Ottieni un transito specifico
router.put('/:id', authenticateToken, authorizeRole(['operatore']), updateTransito); // Aggiorna un transito
router.delete('/:id', authenticateToken, authorizeRole(['operatore']), deleteTransito); // Elimina un transito

export default router;
