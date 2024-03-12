import { Request, Response, NextFunction } from 'express';
import {addComplaint, deleteComplaint,getMyComplaint,getComplaint,updateComplaint,filterComplaints} from './complaint.service.js';
import { AuthRequest } from "../Middleware/Auth";

export const complaintAdd = async (req:AuthRequest, res:Response, next:NextFunction) => {
    
  try {
    req.body.createdBy =req.userId;
    await addComplaint(req.body);
    res.status(201).json({
      message: 'created successfully!'
    });
  } catch (error) {
    next(error);
  }
  };

  export const complaintDelete = async (req:AuthRequest, res:Response, next:NextFunction) => {
    
    try{
       
    await deleteComplaint(req.params.id,req.userId as string);
    res.status(200).json({
      message:"deleted successfuly"
    });
  }catch(error){
    next(error);
  }
  };


  export const complaintGet = async (req:AuthRequest, res:Response, next:NextFunction) => {
    
    try{
       
  const complaint =  await getComplaint(req.params.id,req.userId as string);
    res.status(200).json(complaint);
  }catch(error){
    next(error);
  }
  };

  export const myComplaints = async (req:AuthRequest, res:Response, next:NextFunction) => {
    
    try{
       
   const complaints = await getMyComplaint(req.userId as string,Number(req.query.page),Number(req.query.limit));
    res.status(200).json(complaints);
  }catch(error){
    next(error);
  }
  };
//
interface FilterOptions {
  createdBy?: string;
  status?: string;
}
  export const getComplaints = async (req:AuthRequest, res:Response, next:NextFunction) => {
const userId = req.query.userId ? String(req.query.userId) : undefined;
const status = req.query.status ? String(req.query.status) : undefined;
let query:FilterOptions = {};
  if (userId) {
    query['createdBy'] = userId; // Ensure status is in uppercase
  }
  if (status) {
    query['status'] = status; // Ensure status is in uppercase
  }
    try{ 
   const complaints = await filterComplaints(Number(req.query.page),Number(req.query.limit),query);
    res.status(200).json(complaints);
  }catch(error){
    next(error);
  }
  };


  export const complaintUpdate = async (req:AuthRequest, res:Response, next:NextFunction) => {
    
    try{
       
    await updateComplaint(req.params.id,req.body.status as "PENDING" | "INPROGRESS" | "RESOLVED" | "REJECTED");
    res.status(200).json({
      message:"updated successfuly"
    });
  }catch(error){
    next(error);
  }
  };