import { schema } from "express-validation";

import Joi from 'joi';

export const categorySchema:schema = {body:Joi.object( {
  name: Joi.string().required(),
  description: Joi.string().allow('').optional(),
})};

export const updatecategorySchema:schema = {body:Joi.object( {
    name: Joi.string().optional(),
    description: Joi.string().allow('').optional(),
  }),params:Joi.object({
    id:Joi.string().trim().required().regex(/^[0-9a-fA-F]{24}$/)
  })};

  export const paramsIdSchema:schema = {params:Joi.object({
    id:Joi.string().trim().required().regex(/^[0-9a-fA-F]{24}$/)
  })};

   export const categoryPaginateSchema:schema = {query :Joi.object({
     page: Joi.number().integer().min(1).required(),
     limit: Joi.number().integer().min(1).required(),
   })};
