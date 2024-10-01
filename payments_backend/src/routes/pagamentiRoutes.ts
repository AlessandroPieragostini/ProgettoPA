import { Router } from 'express';
import Credito from '../models/credito';
import Pagamento from '../models/pagamento';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

// Ricarica credito di un utente (solo admin)
router.post('/credito/ricarica', authenticateJWT, async (req, res) => {
  const { utenteId, importo } = req.body;

  try {
    const credito = await Credito.create({ utenteId, importo });
    res.status(201).json(credito);
  } catch (error) {
    res.status(500).json({ error: 'Errore nella ricarica del credito' });
  }
});

// Verifica del credito dell'utente
router.get('/credito/verifica', authenticateJWT, async (req, res) => {
  const utenteId = req.user.id;

  try {
    const credito = await Credito.findOne({ where: { utenteId } });
    res.status(200).json(credito);
  } catch (error) {
    res.status(500).json({ error: 'Errore nella verifica del credito' });
  }
});

// Pagamento di una multa
router.post('/pagamenti', authenticateJWT, async (req, res) => {
  const { multaId, importo } = req.body;
  const utenteId = req.user.id;

  try {
    const pagamento = await Pagamento.create({ multaId, utenteId, importo });
    res.status(201).json(pagamento);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel pagamento della multa' });
  }
});

// Download di una ricevuta di pagamento
router.get('/pagamenti/:id/ricevuta', authenticateJWT, async (req, res) => {
  const pagamentoId = req.params.id;

  try {
    const pagamento = await Pagamento.findByPk(pagamentoId);
    if (!pagamento) {
      res.status(404).json({ error: 'Pagamento non trovato' });
      return;
    }

    // Generazione PDF non implementata in questo esempio.
    res.status(200).json({ message: 'PDF della ricevuta generato con successo', pagamento });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel download della ricevuta' });
  }
});

export default router;
