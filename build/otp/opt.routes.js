"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validation_1 = require("express-validation");
const otp_validation_1 = require("./otp.validation");
const otp_controller_1 = require("./otp.controller");
const router = (0, express_1.Router)();
router.get('/send/:email', (0, express_validation_1.validate)(otp_validation_1.emailParamShemaCheck), otp_controller_1.sendOtp);
router.get('/resend/:Token', (0, express_validation_1.validate)(otp_validation_1.tokenParamShemaCheck), otp_controller_1.otpResend);
router.post('/verify/:Token', (0, express_validation_1.validate)(otp_validation_1.verifyShemaCheck), otp_controller_1.otpVerify);
router.post('/reset/:Token', (0, express_validation_1.validate)(otp_validation_1.resetPasswordSchema), otp_controller_1.resetPassword);
exports.default = router;