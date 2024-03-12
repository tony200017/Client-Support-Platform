"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.resetPasswordSchema = { body: joi_1.default.object({
        password: joi_1.default.string().required().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*])')), // At least one lowercase letter, one uppercase letter, one digit, and one special character
    }), params: joi_1.default.object({
        Token: joi_1.default.string().length(40).hex().required()
    }) };
