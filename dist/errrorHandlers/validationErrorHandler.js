"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (error) => {
    const errors = Object.values(error.errors);
    const listOfErrors = errors.map((error) => {
        return {
            path: error === null || error === void 0 ? void 0 : error.path,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    });
    return {
        statusCode: 400,
        message: 'Validation Error',
        errorMessage: listOfErrors,
    };
};
exports.handleValidationError = handleValidationError;
