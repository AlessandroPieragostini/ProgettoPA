import { Request, Response, NextFunction } from 'express';
import { UserDAO } from '../dao/userDAO';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory'; // Assicurati di avere il percorso corretto

export class CreditoController {
  // Funzione per ottenere il credito disponibile dell'utente
  static async getCredito(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id; // ID deve essere nel token JWT

      const user = await UserDAO.getUserById(userId);
      if (!user) {
        return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato'));
      }

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

      if (importoRicarica <= 0) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Importo di ricarica non valido'));
      }

      const user = await UserDAO.getUserById(userId);
      if (!user) {
        return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato'));
      }

      const nuovoCredito = Number(user.credit) + Number(importoRicarica);
      await UserDAO.aggiornaCredito(userId, nuovoCredito);

      res.json({
        messaggio: 'Ricarica effettuata con successo',
        creditoAggiornato: nuovoCredito,
      });
    } catch (error) {
      return next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante la ricarica del credito'));
    }
  }
}
