"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodErrorHandler = (error) => {
    const statusCode = 400;
    const message = 'zod validation error';
    const errorMessages = error.errors.map(err => {
        return {
            path: err === null || err === void 0 ? void 0 : err.path[err.path.length - 1],
            message: err === null || err === void 0 ? void 0 : err.message,
        };
    });
    return {
        statusCode,
        errorMessages,
        message,
    };
};
exports.default = zodErrorHandler;
