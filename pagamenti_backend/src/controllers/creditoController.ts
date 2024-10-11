import { Request, Response } from 'express';
import { UserDAO } from '../dao/userDAO';

export class CreditoController {
  // Funzione per ottenere il credito disponibile dell'utente
  static async getCredito(req: Request, res: Response) {
    try {
      const userId = req.user.id; // ID deve essere nel token JWT

      // Ottieni l'utente dal DAO
      const user = await UserDAO.getUserById(userId);

      if (!user) {
        res.status(404).json({ messaggio: 'Utente non trovato' });
        return;
      }

      // Restituisce il credito dell'utente
      res.json({ credito: user.credit });
    } catch (error) {
      res.status(500).json({ messaggio: 'Errore durante il recupero del credito' });
    }
  }

  // Funzione per ricaricare il credito dell'utente
  static async ricaricaCredito(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const { importoRicarica } = req.body;

      // Controlla se l'importo di ricarica è valido
      if (importoRicarica <= 0) {
        res.status(400).json({ messaggio: 'Importo di ricarica non valido' });
        return;
      }

      // Ottieni l'utente dal DAO
      const user = await UserDAO.getUserById(userId);

      if (!user) {
        res.status(404).json({ messaggio: 'Utente non trovato' });
        return;
      }

      // Aggiungi l'importo di ricarica al credito attuale dell'utente
      const nuovoCredito = Number(user.credit) + Number(importoRicarica);
      await UserDAO.aggiornaCredito(userId, nuovoCredito);

      // Restituisce il nuovo credito aggiornato
      res.json({
        messaggio: 'Ricarica effettuata con successo',
        creditoAggiornato: nuovoCredito,
      });
    } catch (error) {
      res.status(500).json({ messaggio: 'Errore durante la ricarica del credito' });
    }
  }
}
