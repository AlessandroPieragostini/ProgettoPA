import { StatusCodes } from 'http-status-codes';

// Classe HttpError che estende la classe Error per gestire gli errori HTTP
export class HttpError extends Error {
  statusCode: number;
  code: string;
  details?: any;

  constructor(statusCode: number, message: string, code: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

// Tipi di errore comuni nell'applicazione
export enum ErrorTypes {
  NotFound = 'NotFound',
  BadRequest = 'BadRequest',
  InvalidID = 'InvalidID',
  InternalServerError = 'InternalServerError',
  Unauthorized = 'Unauthorized',
  InvalidToken = 'InvalidToken',
  Forbidden = 'Forbidden',
  TokenExpired = 'TokenExpired',
  JsonWebTokenError = 'JsonWebTokenError'
}

// Classe ErrorFactory per creare istanze di HttpError in base al tipo di errore
export class ErrorFactory {
  static createError(type: ErrorTypes, message: string, details?: any): HttpError {
    switch (type) {
      case ErrorTypes.NotFound:
        return new HttpError(StatusCodes.NOT_FOUND, message, 'NOT_FOUND', details);
      case ErrorTypes.BadRequest:
        return new HttpError(StatusCodes.BAD_REQUEST, message, 'BAD_REQUEST', details);
      case ErrorTypes.InvalidID:
        return new HttpError(StatusCodes.BAD_REQUEST, message, 'INVALID_ID', details);
      case ErrorTypes.Unauthorized:
        return new HttpError(StatusCodes.UNAUTHORIZED, message, 'UNAUTHORIZED', details);
      case ErrorTypes.InvalidToken:
        return new HttpError(StatusCodes.BAD_REQUEST, message, 'INVALID_TOKEN', details);
      case ErrorTypes.Forbidden:
        return new HttpError(StatusCodes.FORBIDDEN, message, 'FORBIDDEN', details);
      case ErrorTypes.TokenExpired:
        return new HttpError(StatusCodes.UNAUTHORIZED, message, 'TOKEN_EXPIRED', details);
      case ErrorTypes.JsonWebTokenError:
        return new HttpError(StatusCodes.BAD_REQUEST, message, 'JWT_ERROR', details);
      case ErrorTypes.InternalServerError:
      default:
        return new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, message, 'INTERNAL_SERVER_ERROR', details);
    }
  }
}
