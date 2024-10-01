import { JWTUser } from './JWTUser'; // Assumi che JWTUser sia già definito da qualche parte

declare global {
  namespace Express {
    interface Request {
      user?: JWTUser;
    }
  }
}
