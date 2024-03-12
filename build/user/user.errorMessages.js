"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessages = void 0;
exports.errorMessages = {
    notfound: {
        statusCode: 404,
        message: 'user not found'
    },
    wrongPassword: {
        statusCode: 401,
        message: 'wrong email or password'
    },
    userAlreadyexist: {
        statusCode: 409,
        message: 'user already exist'
    }
};
