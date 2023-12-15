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
exports.academicSemesterController = void 0;
const academicSemester_service_1 = require("./academicSemester.service");
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = require("../../shared/pick");
const academicSemester_constants_1 = require("./academicSemester.constants");
const createAcademicSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log('data from academic semester controller:', data);
    const result = yield academicSemester_service_1.academicSemesterService.createAcademicSemesterToDB(data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'academic semester is created',
        data: result,
    });
}));
// getAllSemester data
// step1: get req query parameter to search data
// step2: send the pagination option to the service function
const getAllSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.mapReqQuerysProperty)(req.query, academicSemester_constants_1.filterableFields);
    const queryParameter = (0, pick_1.mapReqQuerysProperty)(req.query, academicSemester_constants_1.paginationFields);
    console.log('filters:', filters);
    console.log('queryParameter for pagination:', queryParameter);
    const result = yield academicSemester_service_1.academicSemesterService.getAllSemesterFromBD(filters, queryParameter);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'get all semesters from db',
        data: result.data,
        meta: result.meta,
    });
}));
// function get one semester by the id of the semester
const getOneSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield academicSemester_service_1.academicSemesterService.getOneSemesterFromBD(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'found the academic semester',
        data: result,
    });
}));
// function update a semester
const updateSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    console.log('updateData from cotroller:', updatedData);
    const result = yield academicSemester_service_1.academicSemesterService.updateSemesterToBD(id, updatedData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'update successfully',
        data: result,
    });
}));
// delete semester
const deleteSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = academicSemester_service_1.academicSemesterService.deleteSemesterFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'delete successfully',
        data: result,
    });
}));
exports.academicSemesterController = {
    createAcademicSemester,
    getAllSemester,
    getOneSemester,
    updateSemester,
    deleteSemester,
};
