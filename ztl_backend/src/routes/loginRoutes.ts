import { Router } from 'express';
import { login } from '../controllers/loginController';
import { validateLogin } from '../middleware/validate/loginValidate';

const router = Router();

//rotta di login
router.post('/', validateLogin, login); 

export default router;
