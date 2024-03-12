"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryPaginateSchema = exports.paramsIdSchema = exports.updatecategorySchema = exports.categorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.categorySchema = { body: joi_1.default.object({
        name: joi_1.default.string().required(),
        description: joi_1.default.string().allow('').optional(),
    }) };
exports.updatecategorySchema = { body: joi_1.default.object({
        name: joi_1.default.string().optional(),
        description: joi_1.default.string().allow('').optional(),
    }), params: joi_1.default.object({
        id: joi_1.default.string().trim().required().regex(/^[0-9a-fA-F]{24}$/)
    }) };
exports.paramsIdSchema = { params: joi_1.default.object({
        id: joi_1.default.string().trim().required().regex(/^[0-9a-fA-F]{24}$/)
    }) };
exports.categoryPaginateSchema = { query: joi_1.default.object({
        page: joi_1.default.number().integer().min(1).required(),
        limit: joi_1.default.number().integer().min(1).required(),
    }) };
