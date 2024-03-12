"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailPassword = exports.emailUser = exports.jwtRandomString = exports.mongodbConnection = exports.tableNames = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_CONNECTION_LINK = process.env.MONGODB_CONNECTION_LINK || "";
const JWT_TOKEN_RANDOM_STRING = process.env.JWT_TOKEN_RANDOM_STRING || "";
const EMAIL_USER = process.env.EMAIL_USER || "";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";
exports.tableNames = {
    user: 'User',
    otp: 'Otp',
    passwordReset: 'PasswordReset',
    category: 'Category',
    complaint: 'Complaint'
};
exports.mongodbConnection = MONGODB_CONNECTION_LINK;
exports.jwtRandomString = JWT_TOKEN_RANDOM_STRING;
exports.emailUser = EMAIL_USER;
exports.emailPassword = EMAIL_PASSWORD;
