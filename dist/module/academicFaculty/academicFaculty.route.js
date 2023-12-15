"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const router = express_1.default.Router();
router.post('/create', academicFaculty_controller_1.academicFacultyController.createAcademicFaculty);
router.get('/', academicFaculty_controller_1.academicFacultyController.getAllFaculty);
exports.default = router;
