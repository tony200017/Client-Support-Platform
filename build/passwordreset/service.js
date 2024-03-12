"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPasswordResetByToken = exports.createPasswordReset = void 0;
const HTTPError_1 = require("../errors/HTTPError");
const model_1 = __importDefault(require("./model"));
const errorMessages_1 = require("./errorMessages");
const createPasswordReset = (Obect) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordReset = new model_1.default(Obect);
    const savedPasswordReset = yield passwordReset.save();
});
exports.createPasswordReset = createPasswordReset;
const findPasswordResetByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordResetRecord = yield model_1.default.findOne({ resetToken: token });
    if (!passwordResetRecord) {
        const error = new HTTPError_1.HTTPError(errorMessages_1.errorMessages.notfound.message, errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    if (passwordResetRecord.resetExpires < new Date()) {
        const error = new HTTPError_1.HTTPError(errorMessages_1.errorMessages.expired.message, errorMessages_1.errorMessages.expired.statusCode);
        throw error;
    }
    return passwordResetRecord.userId;
});
exports.findPasswordResetByToken = findPasswordResetByToken;
