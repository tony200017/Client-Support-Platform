
import { schema } from 'express-validation';

import Joi from 'joi';

export const signUpuserSchema:schema = {body :Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    password: Joi.string().required().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*])')), // At least one lowercase letter, one uppercase letter, one digit, and one special character
    isVIP: Joi.boolean().optional().default(false),
    isAdmin: Joi.boolean().optional().default(false)
})};

export const logInuserSchema:schema = {body :Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})};

export const changePasswordSchema:schema = {body :Joi.object({  
    password: Joi.string().required().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*])')), // At least one lowercase letter, one uppercase letter, one digit, and one special character
})};