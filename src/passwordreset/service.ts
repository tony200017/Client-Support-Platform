import { HTTPError } from '../errors/HTTPError';
import PasswordReset,{IpasswordReset} from './model' ;
import {errorMessages} from './errorMessages';



export const createPasswordReset = async (Obect:any)=> {
      const passwordReset = new PasswordReset(Obect);
      const savedPasswordReset = await passwordReset.save();
  }

  export const findPasswordResetByToken = async (token:string)=> {
    const passwordResetRecord = await PasswordReset.findOne({resetToken:token});
    if(!passwordResetRecord){
        const error = new HTTPError(errorMessages.notfound.message,errorMessages.notfound.statusCode);
        throw error;
        
       }
       if(passwordResetRecord.resetExpires<new Date()){
        const error = new HTTPError(errorMessages.expired.message,errorMessages.expired.statusCode);
        throw error;
       }
    return passwordResetRecord.userId;  
}

 