"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const GlobalErrorHandler_1 = require("./middleware/GlobalErrorHandler");
const index_1 = __importDefault(require("./routes/index"));
const http_status_1 = __importDefault(require("http-status"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// body perser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cookie_parser_1.default)());
// app route use
app.use('/', index_1.default);
// global error handler
app.use(GlobalErrorHandler_1.globalErrorHandler);
// page not found route
app.use((req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'page not found',
        errorMessage: [
            {
                path: req.originalUrl,
                message: ' wrong API',
            },
        ],
    });
});
exports.default = app;
