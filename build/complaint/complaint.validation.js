"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComplaintSchema = exports.updateComplaintSchema = exports.myComplaintSchema = exports.paramsIdSchema = exports.complaintValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.complaintValidationSchema = { body: joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        categories: joi_1.default.array().items(joi_1.default.string().trim().required().regex(/^[0-9a-fA-F]{24}$/)).required(),
        status: joi_1.default.string().valid('PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED').default('PENDING'),
    }) };
exports.paramsIdSchema = { params: joi_1.default.object({
        id: joi_1.default.string().trim().required().regex(/^[0-9a-fA-F]{24}$/)
    }) };
exports.myComplaintSchema = { query: joi_1.default.object({
        page: joi_1.default.number().integer().min(1).required(),
        limit: joi_1.default.number().integer().min(1).required(),
    }) };
exports.updateComplaintSchema = { body: joi_1.default.object({
        status: joi_1.default.string().valid('PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED').required(),
    }) };
exports.getComplaintSchema = { query: joi_1.default.object({
        page: joi_1.default.number().integer().min(1).required(),
        limit: joi_1.default.number().integer().min(1).required(),
        status: joi_1.default.string().valid('PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED').optional(),
        userId: joi_1.default.string().trim().regex(/^[0-9a-fA-F]{24}$/).optional(),
    }) };
