"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessages = void 0;
exports.errorMessages = {
    notfound: {
        statusCode: 404,
        message: 'otp not found'
    },
    otpAlreadyexist: {
        statusCode: 409,
        message: 'otp already exist'
    },
    wrongOtp: {
        statusCode: 401,
        message: 'wrong otp'
    },
    expireOtp: {
        statusCode: 401,
        message: 'otp expired'
    },
};
