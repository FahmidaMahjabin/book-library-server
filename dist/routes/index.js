"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = __importDefault(require("../module/book/book.route"));
// import { AcademicFaculty } from '../module/academicFaculty/academicFaculty.model'
const routes = express_1.default.Router();
const appRoutes = [{ path: '/book', route: book_route_1.default }];
appRoutes.forEach(route => routes.use(route.path, route.route));
exports.default = routes;
