"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = express_1.default.Router();
router.post('/create', academicDepartment_controller_1.academicDepartmentController.createAcademicDepartment);
router.get('/all-departments', academicDepartment_controller_1.academicDepartmentController.getAllDepartments);
exports.default = router;
