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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentController = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = require("../../shared/pick");
const aademicDepartment_constant_1 = require("./aademicDepartment.constant");
const academicDepartment_service_1 = require("./academicDepartment.service");
const createAcademicDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log('data from academic department controller:', data);
    const result = yield academicDepartment_service_1.academicDepartementService.createAcademicDepartmentToDB(data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'academic department is created',
        data: result,
    });
}));
// getAllDepartments data
// step1: get req query parameter to search data
// step2: send the pagination option to the service function
const getAllDepartments = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.mapReqQuerysProperty)(req.query, aademicDepartment_constant_1.filterableFieldsforDepartment);
    const queryParameter = (0, pick_1.mapReqQuerysProperty)(req.query, aademicDepartment_constant_1.paginationFieldsforDepartment);
    console.log('filters:', filters);
    console.log('queryParameter for pagination:', queryParameter);
    const result = yield academicDepartment_service_1.academicDepartementService.getAllDepartmentsFromBD(filters, queryParameter);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'get all departments from db',
        data: result.data,
        meta: result.meta,
    });
}));
exports.academicDepartmentController = {
    createAcademicDepartment,
    getAllDepartments,
};
