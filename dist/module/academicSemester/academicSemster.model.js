"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemester = void 0;
const mongoose_1 = require("mongoose");
const academicSemester_constants_1 = require("./academicSemester.constants");
const ApiErrorHandler_1 = require("../../errrorHandlers/ApiErrorHandler");
const academicSemesterSchema = new mongoose_1.Schema({
    title: { type: String, enum: academicSemester_constants_1.title, required: true },
    year: { type: String, required: true },
    code: { type: String, enum: academicSemester_constants_1.code, required: true },
    startMonth: { type: String, enum: academicSemester_constants_1.month, required: true },
    endMonth: { type: String, enum: academicSemester_constants_1.month, required: true },
});
// same year and same semester duplicate entry check
academicSemesterSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield exports.AcademicSemester.findOne({
            title: this.title,
            year: this.year,
        });
        console.log('isExist:', isExist);
        if (isExist) {
            throw new ApiErrorHandler_1.ApiError(409, 'conflict for same year and same semester');
        }
        next();
    });
});
exports.AcademicSemester = (0, mongoose_1.model)('academicSemester', academicSemesterSchema);
