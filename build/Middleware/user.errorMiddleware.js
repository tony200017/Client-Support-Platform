"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Error handling middleware for validation errors
const ErrorMiddleware = (error, req, res, next) => {
    if (error) {
        // Validation error occurred
        console.log("http");
        return res.status(error.statusCode || 500).send(error.message || 'Internal Server Error');
    }
    else {
        console.log("last resourse");
        return res.status(500).send('unexpected error');
    }
};
exports.default = ErrorMiddleware;
