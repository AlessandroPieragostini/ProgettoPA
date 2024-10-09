import { Request, Response } from 'express';
import { UserDAO } from '../dao/userDAO';

export class CreditoController {
  // Funzione per ricaricare il credito di un utente
  static async ricaricaCredito(req: Request, res: Response) {
    try {
      const { userId } = req.params; // L'ID dell'utente viene passato tramite l'URL
      const { importo } = req.body; // L'importo da ricaricare è nel corpo della richiesta

      // Ottieni l'utente
      const user = await UserDAO.getUserById(parseInt(userId));

      if (!user) {
        res.status(404).json({ messaggio: 'Utente non trovato' });
        return ;
      }

      // Aggiorna il credito dell'utente
      const nuovoCredito = user.credito + importo;
      const utenteAggiornato = await UserDAO.aggiornaCredito(parseInt(userId), nuovoCredito);

      res.json({
        messaggio: 'Credito ricaricato con successo',
        utente: utenteAggiornato,
      });
      return ;
    } catch (error) {
      res.status(500).json({ messaggio: 'Errore durante la ricarica del credito' });
      return ;
    }
  }
}
