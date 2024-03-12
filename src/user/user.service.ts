import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import {IUser} from './user.model' ;
import User from './user.model' ;
import { HTTPError } from '../errors/HTTPError';
import {errorMessages} from './user.errorMessages';
import { jwtRandomString } from '../config';

export const addUser = async (userData:IUser) => {
  const checkUser = await User.findOne({email:userData.email});
  
  if(checkUser){
    const error = new HTTPError(errorMessages.userAlreadyexist.message,errorMessages.userAlreadyexist.statusCode);
    throw error;
  }
      userData.password = await bcrypt.hash(userData.password,12);
      
      const user = new User(userData);
      await user.save();
      console.log('user added successfully');
      return user._id;
   
  };
 
 export const loginService = async (loginData:IUser) => {
 let email =  loginData.email
 let password = loginData.password
 const user = await User.findOne({email:email});
  
  if(!user){
    const error = new HTTPError(errorMessages.notfound.message,errorMessages.notfound.statusCode);
    throw error;
  }
const result = await bcrypt.compare(password,user.password);
if(!result){
  const error = new HTTPError(errorMessages.wrongPassword.message,errorMessages.wrongPassword.statusCode);
  throw error;
}

const token =jwt.sign({email:user.email,userId:user._id.toString()},jwtRandomString,{expiresIn:'1h'})
 return {token,userId:user._id.toString()};  
 
};

export const userByEmail = async (email:String) => {
 
 
   const user = await User.findOne({email:email});
   
    if(!user){
      const error = new HTTPError(errorMessages.notfound.message,errorMessages.notfound.statusCode);
      throw error;
    }
 return user;
  
 };

 export const userById = async (id:String) => {
 
 
  const user = await User.findById(id);
  
   if(!user){
     const error = new HTTPError(errorMessages.notfound.message,errorMessages.notfound.statusCode);
     throw error;
   }
return user;
 
};


 export const resetPasswordById = async (Id:String,password:string) => {
 
 
  const user = await User.findById(Id);
  
    if(!user){
      const error = new HTTPError(errorMessages.notfound.message,errorMessages.notfound.statusCode);
      throw error;
    }
  user.password =await bcrypt.hash(password,12); ;
await user.save();
 
};

  
  