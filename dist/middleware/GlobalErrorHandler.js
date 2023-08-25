"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const config_1 = __importDefault(require("../config"));
const validationErrorHandler_1 = require("../errrorHandlers/validationErrorHandler");
const ApiErrorHandler_1 = require("../errrorHandlers/ApiErrorHandler");
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const zodErrorHandler_1 = __importDefault(require("../errrorHandlers/zodErrorHandler"));
const globalErrorHandler = (err, req, res, next) => {
    if (config_1.default.env === 'development') {
        console.log('global error handler:', err);
    }
    else {
        console.log('global error handler:', err);
    }
    let statusCode = 500;
    let message = 'something went wrong';
    let errorMessages = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiedError = (0, validationErrorHandler_1.handleValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessage;
    }
    else if (err instanceof ApiErrorHandler_1.ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        errorMessages = err.message
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodErrorHandler_1.default)(err);
        console.log('simplified error from global error handler:', simplifiedError);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof mongoose_1.Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env == 'development' ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
};
exports.globalErrorHandler = globalErrorHandler;
