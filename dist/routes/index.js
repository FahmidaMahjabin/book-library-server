"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = require("../module/product/product.route");
const reviews_route_1 = require("../module/reviews/reviews.route");
// import { AcademicFaculty } from '../module/academicFaculty/academicFaculty.model'
const routes = express_1.default.Router();
const appRoutes = [
    { path: '/product', route: product_route_1.productRouter },
    { path: '/review', route: reviews_route_1.reviewRouter },
];
appRoutes.forEach(route => routes.use(route.path, route.route));
exports.default = routes;
