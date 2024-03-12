import {Iotp} from './otp.model' ;
import Otp from './otp.model' ;
import crypto from 'crypto';
import { userByEmail ,resetPasswordById} from '../user/user.service';
import nodemailer from 'nodemailer';
import { emailUser,emailPassword } from '../config';
import { HTTPError } from '../errors/HTTPError';
import { errorMessages } from './otp.errorMessages';
import { createPasswordReset,findPasswordResetByToken } from '../passwordreset/service';

export const generateOTP= async ():Promise<string>=> {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

// Function to generate a verification token
export const generateVerificationToken= async () :Promise<string> => {
  let token = crypto.randomBytes(20).toString('hex');
  
  return token;
}

//
async function sendEmailWithOTPAndPhrase(email: string, otp: string, phrase: string): Promise<void> {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // You can use other services or transport options as well
        host:'smpt.gmail.com',
        port:587,
        secure:false,
        auth: {
            user: emailUser, // Your email address
            pass: emailPassword // Your email password
        }
    });

    // Email content
    const mailOptions: nodemailer.SendMailOptions = {
        from: emailUser,
        to: email,
        subject: 'Forgot password otp',
        html: `<p>Your OTP is: <h1>${otp}</h1></p>
               <p> ${phrase}</p>`
    };

  
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    
}
//

// Function to create OTP and save it to the database
export const createOtp =async (email:string) => {
        // const otpRecord = await otpByEmail(email);
        // if(otpRecord){
        //     const error = new HTTPError(errorMessages.otpAlreadyexist.message,errorMessages.otpAlreadyexist.statusCode);
        //     throw error;
        // }
        const user = await userByEmail(email);
        const otp = await generateOTP(); // Generate OTP
        const otpExpires = new Date(Date.now() + 10 * 60000); // Set expiration time (10 minutes from now)
        const verificationToken = await generateVerificationToken();
        // Save OTP to the database
        const newOtp = new Otp({
            otp: otp,
            email: email,
            otpExpires: otpExpires,
            retrycount: 0, // Assuming initial retry count is 0
            userId: user._id,
            verificationToken: verificationToken // You can add logic to generate a verification token if needed
        });
        await newOtp.save();
        //send email
        await  sendEmailWithOTPAndPhrase(email, otp, "if you want to reset you password")
        return verificationToken; // Return the generated OTP
  
}


export const resendOtp =async (Token:string) => {
    const otpRecord = await Otp.findOne({verificationToken:Token});
   if(!otpRecord){
    const error = new HTTPError(errorMessages.notfound.message,errorMessages.notfound.statusCode);
    throw error;
   }
   if(otpRecord.otpExpires<new Date()){
    const error = new HTTPError(errorMessages.expireOtp.message,errorMessages.expireOtp.statusCode);
    throw error;
   }
    //send email
    await  sendEmailWithOTPAndPhrase(otpRecord.email, otpRecord.otp, "if you want to reset you password")
    return otpRecord.verificationToken; // Return the generated OTP

}


export const verifyOtp =async (Token:string,otp:string) => {
    const otpRecord = await Otp.findOne({verificationToken:Token});
   if(!otpRecord){
    const error = new HTTPError(errorMessages.notfound.message,errorMessages.notfound.statusCode);
    throw error;
   }
   if(otpRecord.otpExpires<new Date()){
    const error = new HTTPError(errorMessages.expireOtp.message,errorMessages.expireOtp.statusCode);
    throw error;
   }
   if(otp!= otpRecord.otp){
    otpRecord.retrycount++;
    otpRecord.save();
    const error = new HTTPError(errorMessages.wrongOtp.message,errorMessages.wrongOtp.statusCode);
    throw error;
    
   }
   const token = await generateVerificationToken();
   const expireDate = new Date(Date.now() + 10 * 60000); // Set expiration time (10 minutes from now)
   const passwordReset ={ resetToken: token, resetExpires: expireDate, userId:otpRecord.userId }



    await createPasswordReset(passwordReset);
    return token; // Return the generated Token

}

export const otpByEmail = async (email:String) => {
 
 
    const otp = await Otp.findOne({email:email});
    
    
  return otp;
   
  };

  export const passwordReset = async (token:string,password:string) => {
 
  const userId =await findPasswordResetByToken(token);

   await  resetPasswordById(userId.toString(),password);
    
    
  
   
  };