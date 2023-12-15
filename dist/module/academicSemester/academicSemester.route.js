"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterRute = void 0;
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/create-semester', (0, validateRequest_1.default)(academicSemester_validation_1.academicSemesterValidation.academicSemesterCreateVedilation), academicSemester_controller_1.academicSemesterController.createAcademicSemester);
router.get('/get-semester/:id', academicSemester_controller_1.academicSemesterController.getOneSemester);
router.get('/get-semester', academicSemester_controller_1.academicSemesterController.getAllSemester);
// update: 1.for updating if want to update title then code must be updated too at routing level
// 2. for update at service level check title and code should match
router.post('/:id', (0, validateRequest_1.default)(academicSemester_validation_1.academicSemesterValidation.academicSemesterUpdateVelidation), academicSemester_controller_1.academicSemesterController.updateSemester);
// delete one semester
router.delete('/:id', academicSemester_controller_1.academicSemesterController.deleteSemester);
exports.academicSemesterRute = { router };
