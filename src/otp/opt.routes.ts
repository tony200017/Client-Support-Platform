import {Router} from 'express';
import {validate} from 'express-validation';
import { emailParamShemaCheck, resetPasswordSchema, tokenParamShemaCheck,verifyShemaCheck } from './otp.validation';
import {sendOtp,otpResend,otpVerify,resetPassword} from './otp.controller';




const router = Router();
router.get('/send/:email',validate(emailParamShemaCheck) ,sendOtp);
router.get('/resend/:Token',validate(tokenParamShemaCheck) ,otpResend);
router.post('/verify/:Token',validate(verifyShemaCheck) ,otpVerify);
router.post('/reset/:Token',validate(resetPasswordSchema) ,resetPassword);




export default router;