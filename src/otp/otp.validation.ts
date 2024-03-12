import { schema } from "express-validation";
import Joi from "joi";

export const emailParamShemaCheck:schema = {params :Joi.object({
    email: Joi.string().email().required()
})};

export const tokenParamShemaCheck:schema = {params :Joi.object({
    Token: Joi.string().length(40).hex().required()
})};

export const verifyShemaCheck:schema = {params :Joi.object({
    Token: Joi.string().length(40).hex().required(),
    
}),
    body: Joi.object({
     otp:Joi.string().length(6).required(),
    })
};

export const resetPasswordSchema:schema = {body :Joi.object({
    password: Joi.string().required().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*])')), // At least one lowercase letter, one uppercase letter, one digit, and one special character
   
}),params:Joi.object({
    Token: Joi.string().length(40).hex().required()
})};