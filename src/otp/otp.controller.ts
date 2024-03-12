import { Request, Response, NextFunction } from 'express';
import { createOtp,resendOtp,verifyOtp,passwordReset } from './otp.service';
export const sendOtp = async (req:Request, res:Response, next:NextFunction) => {
    
    try {
        
    const email:string = req.params.email;
    const Token =  await createOtp(email);
      res.status(201).json({
        Token
      });
    } catch (error) {
      next(error);
    }
    };

    export const otpResend = async (req:Request, res:Response, next:NextFunction) => {
    
        try {
        const Token:string = req.params.Token;
        const newToken =  await resendOtp(Token);
          res.status(201).json({
            Token:newToken
          });
        } catch (error) {
          next(error);
        }
        };


        export const otpVerify = async (req:Request, res:Response, next:NextFunction) => {
    
            try {
            const Token:string = req.params.Token;
            const otp:string = req.body.otp;
            const newToken =  await verifyOtp(Token,otp);
              res.status(201).json({
                Token:newToken
              });
            } catch (error) {
              next(error);
            }
            };

            export const resetPassword = async (req:Request, res:Response, next:NextFunction) => {
    
                try {
                    
                const Token:string = req.params.Token;
                const password:string = req.body.password;
                  await passwordReset(Token,password);
                  res.status(200).json({
                    message:"password resetet"
                  });
                } catch (error) {
                  next(error);
                }
                };