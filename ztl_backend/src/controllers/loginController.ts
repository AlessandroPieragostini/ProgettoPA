import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../utils/tokenJWT';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { StatusCodes } from 'http-status-codes';
import { UserDAO } from '../dao/userDAO';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  
  // Estrae l'email dal corpo della richiesta o dai parametri della query
  const email = req.body.email || req.query.email;

  // Se l'email non è fornita, ritorna un errore 
  if (!email) {
    return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Email non fornita'));
  }

  try {
    // Cerca un utente nel database usando l'email fornita
    const user = await UserDAO.findByEmail(email);
    if (!user) {
      return next(ErrorFactory.createError(ErrorTypes.Unauthorized, `Nessun utente con email ${email}`));
    }
    // Genera il token
    const token = generateToken({ id: user.id, email: user.email, role: user.role});
    res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    return next(error);
  }
};