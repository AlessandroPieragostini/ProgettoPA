import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ErrorFactory, ErrorTypes } from './errorFactory';

/**
 * Generazione e validazione dei JWT
 */

dotenv.config();

const secret = process.env.JWT_SECRET as string;

export const generateToken = (payload: object): string => {
    try {
      return jwt.sign(payload, secret, { expiresIn: '1h' });
    } catch (e) {
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella generazione del token');
    }
  };