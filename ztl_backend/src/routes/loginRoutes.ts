
/**
 * Rotta di autenticazione per il login
 */
import { Router } from 'express';
import { login } from '../controllers/loginController';
import { validateLogin } from '../middleware/validate/loginValidate';

const router = Router();

/**
 * Rotta per il login utente
 */
router.post('/', validateLogin, login); 

export default router;
