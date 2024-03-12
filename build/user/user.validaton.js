"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.logInuserSchema = exports.signUpuserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signUpuserSchema = { body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        firstName: joi_1.default.string().required().min(3),
        lastName: joi_1.default.string().required().min(3),
        password: joi_1.default.string().required().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*])')), // At least one lowercase letter, one uppercase letter, one digit, and one special character
        isVIP: joi_1.default.boolean().optional().default(false),
        isAdmin: joi_1.default.boolean().optional().default(false)
    }) };
exports.logInuserSchema = { body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }) };
exports.changePasswordSchema = { body: joi_1.default.object({
        password: joi_1.default.string().required().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*])')), // At least one lowercase letter, one uppercase letter, one digit, and one special character
    }) };
