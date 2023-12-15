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
exports.reviewServices = void 0;
const reviews_model_1 = require("./reviews.model");
const reviews_constant_1 = require("./reviews.constant");
const addreview = (review) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_model_1.Review.create(review);
    return result;
});
const getAllreviews = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterableFields = __rest(filters, ["searchTerm"]);
    console.log('filterableFields:', filterableFields);
    const andConditions = [];
    // add searchTerm to the andCondition
    if (searchTerm) {
        andConditions.push({
            $or: reviews_constant_1.searchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filterableFields).length) {
        andConditions.push({
            $or: Object.entries(filterableFields).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    console.log('andConditions:', andConditions);
    // search condition
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield reviews_model_1.Review.find(whereCondition).sort('dec').limit(10);
    return result;
});
const getSinglereview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_model_1.Review.findById(id);
    return result;
});
const updatereview = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_model_1.Review.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    });
    console.log('reslt:', result);
    return result;
});
const deletereview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_model_1.Review.findByIdAndDelete(id);
    return result;
});
exports.reviewServices = {
    addreview,
    getAllreviews,
    getSinglereview,
    updatereview,
    deletereview,
};
