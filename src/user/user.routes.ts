import {Router} from 'express';
import {validate} from 'express-validation';
import { signUpuserSchema,logInuserSchema ,changePasswordSchema} from './user.validaton';
import {login,signUp,changePassword} from './user.controller';
import isAuth from "../Middleware/Auth";
import isClient from "../Middleware/client";


const router = Router();
router.post('/signup',validate(signUpuserSchema) ,signUp);
router.post('/login', validate(logInuserSchema),login);
router.put('/changePassword',isAuth,isClient,validate(changePasswordSchema),changePassword);
export default router;