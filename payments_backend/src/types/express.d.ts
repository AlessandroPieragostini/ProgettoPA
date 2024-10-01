import { JWTUser } from './JWTUser'; // Assumi che JWTUser sia già definito da qualche partea

declare global {
  namespace Express {
    interface Request {
      user?: JWTUser;
    }
  }
}

// import { Request } from 'express';

// declare module 'express' {
//   export interface Request {
//     user?: JWTUser; 
//   }
// }
