import { StatusCodes } from 'http-status-codes';

export class HttpError extends Error {
    statusCode: number;
    code: string;
  
    constructor(statusCode: number, message: string, code: string) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.code = code;
    }
  }

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
  
   export class ErrorFactory {
    static createError(type: ErrorTypes, message: string): HttpError {
      switch (type) {
        case ErrorTypes.NotFound:
          return new HttpError(StatusCodes.NOT_FOUND, message, 'NOT_FOUND');
        case ErrorTypes.BadRequest:
          return new HttpError(StatusCodes.BAD_REQUEST, message, 'BAD_REQUEST');
        case ErrorTypes.InvalidID:
          return new HttpError(StatusCodes.BAD_GATEWAY, message, 'INVALID_ID');
        case ErrorTypes.Unauthorized:
          return new HttpError(StatusCodes.UNAUTHORIZED, message, 'UNAUTHORIZED');
          case ErrorTypes.InvalidToken:
        return new HttpError(StatusCodes.BAD_REQUEST, message, 'INVALID_TOKEN');
        case ErrorTypes.Forbidden:
          return new HttpError(StatusCodes.FORBIDDEN, message, 'FORBIDDEN');
        case ErrorTypes.TokenExpired:
          return new HttpError(StatusCodes.UNAUTHORIZED, message, 'TOKEN_EXPIRED');
        case ErrorTypes.JsonWebTokenError:
          return new HttpError(StatusCodes.BAD_REQUEST, message, 'JWT_ERROR');
        case ErrorTypes.InternalServerError:
        default:
          return new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, message, 'INTERNAL_SERVER_ERROR');
      }
    }
  }