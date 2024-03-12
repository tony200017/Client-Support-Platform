"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.verifyShemaCheck = exports.tokenParamShemaCheck = exports.emailParamShemaCheck = void 0;
const joi_1 = __importDefault(require("joi"));
exports.emailParamShemaCheck = { params: joi_1.default.object({
        email: joi_1.default.string().email().required()
    }) };
exports.tokenParamShemaCheck = { params: joi_1.default.object({
        Token: joi_1.default.string().length(40).hex().required()
    }) };
exports.verifyShemaCheck = { params: joi_1.default.object({
        Token: joi_1.default.string().length(40).hex().required(),
    }),
    body: joi_1.default.object({
        otp: joi_1.default.string().length(6).required(),
    })
};
exports.resetPasswordSchema = { body: joi_1.default.object({
        password: joi_1.default.string().required().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*])')), // At least one lowercase letter, one uppercase letter, one digit, and one special character
    }), params: joi_1.default.object({
        Token: joi_1.default.string().length(40).hex().required()
    }) };
