"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = void 0;
exports.errors = {
    notfound: {
        statusCode: 404,
        message: 'user not found'
    },
    wrongPassword: {
        statusCode: 409,
        message: 'wrong email or password'
    },
    userAlreadyexist: {
        statusCode: 409,
        message: 'user already exist'
    }
};
