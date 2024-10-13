import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/errorFactory';

// Middleware per la gestione degli errori
export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const code = err.code || 'INTERNAL_SERVER_ERROR';
    res.status(statusCode).json({
        error: {
            statusCode,
            code,
            message,
        },
    });
};