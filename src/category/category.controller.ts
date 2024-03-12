import { Request, Response, NextFunction } from 'express';
import {getCategories,addCategory,updateCategory,deleteCategory,getCategory,getAllCategory} from './category.service.js';
import { AuthRequest } from '../Middleware/Auth.js';

export const categoryAdd = async (req:Request, res:Response, next:NextFunction) => {
    
  try {
   
    await addCategory(req.body);
    res.status(201).json({
      message: 'created successfully!'
    });
  } catch (error) {
    next(error);
  }
  };


  export const categoryUpdate = async (req:Request, res:Response, next:NextFunction) => {
    
    try{
       
    await updateCategory(req.params.id,req.body);
    res.status(200).json({
      message:"updated successfuly"
    });
  }catch(error){
    next(error);
  }
  };

  export const categoryDelete = async (req:Request, res:Response, next:NextFunction) => {
    
    try{
       
    await deleteCategory(req.params.id);
    res.status(200).json({
      message:"deleted successfuly"
    });
  }catch(error){
    next(error);
  }
  };


  export const allCategories = async (req:Request, res:Response, next:NextFunction) => {
    
    try{
       
   const categories = await getCategories();
    res.status(200).json(categories);
  }catch(error){
    next(error);
  }
  };

  export const categoryGet = async (req:AuthRequest, res:Response, next:NextFunction) => {
    
    try{
       
  const category =  await getCategory(req.params.id);
    res.status(200).json(category);
  }catch(error){
    next(error);
  }
  };

  export const categories = async (req:AuthRequest, res:Response, next:NextFunction) => {
    
    try{
       
   const complaints = await getAllCategory(Number(req.query.page),Number(req.query.limit));
    res.status(200).json(complaints);
  }catch(error){
   next(error);
  }
  };