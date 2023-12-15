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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterService = void 0;
const ApiErrorHandler_1 = require("../../errrorHandlers/ApiErrorHandler");
const logger_1 = require("../../shared/logger");
const academicSemester_constants_1 = require("./academicSemester.constants");
const academicSemster_model_1 = require("./academicSemster.model");
const createAcademicSemesterToDB = (semesterData) => __awaiter(void 0, void 0, void 0, function* () {
    // check if code for a certail title is same
    if (academicSemester_constants_1.titleAndCodeMapper[semesterData.title] != semesterData.code) {
        throw new ApiErrorHandler_1.ApiError(406, 'not acceptable code for this title');
    }
    const createdSemester = yield academicSemster_model_1.AcademicSemester.create(semesterData);
    if (createdSemester) {
        return createdSemester;
    }
    logger_1.errorLogger.error('failed to create new academic semester');
    throw new Error('failed to create academic semester');
});
const getAllSemesterFromBD = (filters, queryObject) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterableFields = __rest(filters, ["searchTerm"]);
    console.log('filterableFields:', filterableFields);
    const andConditions = [];
    // add searchTerm to the andCondition
    if (searchTerm) {
        andConditions.push({
            $or: academicSemester_constants_1.searchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // add filterable conditions to the and condition
    // if (Object.keys(filterableFields).length) {
    //   andConditions.push({
    //     $and: Object.keys(filterableFields).map(eachField => ({
    //       [eachField]: {
    //         $regex: filterableFields[eachField],
    //         $options: 'i',
    //       },
    //     })),
    //   })
    // }
    // alternative option for filterable data
    if (Object.keys(filterableFields).length) {
        andConditions.push({
            $or: Object.entries(filterableFields).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    console.log('andConditions:', andConditions);
    // const andConditions = [
    //   {
    //     $or: [
    //       {
    //         title: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         code: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         year: {
    //           $in: searchTerm,
    //         },
    //       },
    //     ],
    //   },
    // ]
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', } = queryObject;
    const skip = (page - 1) * limit;
    const sortOption = {};
    if (sortBy && sortOrder) {
        sortOption[sortBy] = sortOrder;
    }
    // search condition
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield academicSemster_model_1.AcademicSemester.find(whereCondition)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
    const total = yield academicSemster_model_1.AcademicSemester.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get one semester from BD
const getOneSemesterFromBD = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemster_model_1.AcademicSemester.findById(id);
    return result;
});
const deleteSemesterFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemster_model_1.AcademicSemester.findByIdAndDelete(id);
    return result;
});
// update one semester
const updateSemesterToBD = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('updatedData:', updateData);
    if ((updateData === null || updateData === void 0 ? void 0 : updateData.title) && (updateData === null || updateData === void 0 ? void 0 : updateData.code)) {
        if (academicSemester_constants_1.titleAndCodeMapper[updateData.title] != updateData.code) {
            throw new ApiErrorHandler_1.ApiError(406, 'not acceptable code for this title');
        }
    }
    const result = yield academicSemster_model_1.AcademicSemester.findOneAndUpdate({ _id: id }, updateData, { new: true });
    return result;
});
exports.academicSemesterService = {
    createAcademicSemesterToDB,
    getAllSemesterFromBD,
    getOneSemesterFromBD,
    updateSemesterToBD,
    deleteSemesterFromDB,
};
