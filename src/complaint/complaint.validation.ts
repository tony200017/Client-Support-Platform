import { schema } from 'express-validation';
import Joi from 'joi';

export const complaintValidationSchema:schema = {body : Joi.object({
   title: Joi.string().required(),
   description: Joi.string().required(),
   categories: Joi.array().items(Joi.string().trim().required().regex(/^[0-9a-fA-F]{24}$/)).required(),
   status: Joi.string().valid('PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED').default('PENDING'),
  })};

  export const paramsIdSchema:schema = {params:Joi.object({
    id:Joi.string().trim().required().regex(/^[0-9a-fA-F]{24}$/)
  })};

  export const myComplaintSchema:schema = {query :Joi.object({
    page: Joi.number().integer().min(1).required(),
    limit: Joi.number().integer().min(1).required(),
  })};


  export const updateComplaintSchema:schema = {body : Joi.object({
    status: Joi.string().valid('PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED').required(),
   })};

   export const getComplaintSchema:schema = {query :Joi.object({
    page: Joi.number().integer().min(1).required(),
    limit: Joi.number().integer().min(1).required(),
    status: Joi.string().valid('PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED').optional(),
    userId: Joi.string().trim().regex(/^[0-9a-fA-F]{24}$/).optional(),
  })};