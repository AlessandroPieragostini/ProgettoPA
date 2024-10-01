import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: JWTUser; // Puoi sostituire `any` con il tipo corretto del tuo utente, ad esempio `User` o `JWTUser`
  }
}
