import { Request, Response, NextFunction } from 'express';
import {addUser , loginService,resetPasswordById} from './user.service.js';
import { AuthRequest } from "../Middleware/Auth";

export const signUp = async (req:Request, res:Response, next:NextFunction) => {
    
  try {
   
    await addUser(req.body);
    res.status(201).json({
      message: 'User created successfully!'
    });
  } catch (error) {
    next(error);
  }
  };


  export const login = async (req:Request, res:Response, next:NextFunction) => {
    
    try{
       
   const authObj = await loginService(req.body);
    res.status(200).json(
      authObj
    );
  }catch(error){
    next(error);
  }
  };

  export const changePassword = async (req:AuthRequest, res:Response, next:NextFunction) => {
    
    try{
       
   await resetPasswordById(req.userId as string,req.body.password);
    res.status(200).json({
      message:"password changed"
    });
  }catch(error){
    next(error);
  }
  };