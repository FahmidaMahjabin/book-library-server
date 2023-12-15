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
exports.academicDepartementService = void 0;
const aademicDepartment_constant_1 = require("./aademicDepartment.constant");
const academicDepartment_model_1 = require("./academicDepartment.model");
const createAcademicDepartmentToDB = (departmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield academicDepartment_model_1.AcademicDepartment.create(departmentData)).populate('faculty');
    return result;
});
const getAllDepartmentsFromBD = (filters, queryObject) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterableFields = __rest(filters, ["searchTerm"]);
    console.log('filterableFields:', filterableFields);
    const andConditions = [];
    // add searchTerm to the andCondition
    if (searchTerm) {
        andConditions.push({
            $or: aademicDepartment_constant_1.searchableFields.map(field => ({
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
    const result = yield academicDepartment_model_1.AcademicDepartment.find(whereCondition)
        .populate('faculty')
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
    const total = yield academicDepartment_model_1.AcademicDepartment.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.academicDepartementService = {
    createAcademicDepartmentToDB,
    getAllDepartmentsFromBD,
};
