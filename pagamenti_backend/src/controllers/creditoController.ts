import { Request, Response, NextFunction } from 'express';
import { UserDAO } from '../dao/userDAO';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

export class CreditoController {
  // Funzione per ottenere il credito disponibile dell'utente
  static async getCredito(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id; 

      const user = await UserDAO.getUserById(userId); 
      if (!user) {
        return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato')); 
      }

      // Restituisce il credito dell'utente in formato JSON
      res.json({ credito: user.credit });
    } catch (error) {
      return next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero del credito'));
    }
  }

  // Funzione per ricaricare il credito dell'utente
  static async ricaricaCredito(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { importoRicarica } = req.body;

      // Verifica che l'importo di ricarica sia valido (maggiore di 0)
      if (importoRicarica <= 0) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Importo di ricarica non valido')); 
      }

      const user = await UserDAO.getUserById(userId);
      if (!user) {
        return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato')); 
      }

      // Calcola il nuovo credito sommando l'importo ricaricato
      const nuovoCredito = Number(user.credit) + Number(importoRicarica);
      // Aggiorna il credito dell'utente nel database
      await UserDAO.aggiornaCredito(userId, nuovoCredito);

      // Restituisce un messaggio di successo e il nuovo saldo del credito
      res.json({
        messaggio: 'Ricarica effettuata con successo', 
        creditoAggiornato: nuovoCredito, 
      });
    } catch (error) {
      return next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante la ricarica del credito')); 
    }
  }
}
