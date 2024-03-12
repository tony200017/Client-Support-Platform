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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.otpVerify = exports.otpResend = exports.sendOtp = void 0;
const otp_service_1 = require("./otp.service");
const sendOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const Token = yield (0, otp_service_1.createOtp)(email);
        res.status(201).json({
            Token
        });
    }
    catch (error) {
        next(error);
    }
});
exports.sendOtp = sendOtp;
const otpResend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Token = req.params.Token;
        const newToken = yield (0, otp_service_1.resendOtp)(Token);
        res.status(201).json({
            Token: newToken
        });
    }
    catch (error) {
        next(error);
    }
});
exports.otpResend = otpResend;
const otpVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Token = req.params.Token;
        const otp = req.body.otp;
        const newToken = yield (0, otp_service_1.verifyOtp)(Token, otp);
        res.status(201).json({
            Token: newToken
        });
    }
    catch (error) {
        next(error);
    }
});
exports.otpVerify = otpVerify;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Token = req.params.Token;
        const password = req.body.password;
        yield (0, otp_service_1.passwordReset)(Token, password);
        res.status(200).json({
            message: "password resetet"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
