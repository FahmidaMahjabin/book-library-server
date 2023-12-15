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
exports.reviewController = void 0;
const reviews_service_1 = require("./reviews.service");
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const pick_1 = require("../../shared/pick");
const reviews_constant_1 = require("./reviews.constant");
const addreviewToDB = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewData = req.body;
    const result = yield reviews_service_1.reviewServices.addreview(reviewData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'review added successfully',
        data: result,
    });
}));
const updatereview = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = yield req.params;
    const updateData = yield req.body;
    console.log('updateData:', updateData);
    const result = yield reviews_service_1.reviewServices.updatereview(id, updateData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'review updated successfully',
        data: result,
    });
}));
const deletereview = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = yield req.params;
    const result = yield reviews_service_1.reviewServices.deletereview(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'review deleted successfully',
        data: result,
    });
}));
const getAllreviews = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.mapReqQuerysProperty)(req.query, reviews_constant_1.filterableFields);
    console.log('filters:', filters);
    const result = yield reviews_service_1.reviewServices.getAllreviews(filters);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'retrived all reviews  successfully',
        data: result,
    });
}));
const getSinglereview = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = yield req.params;
    const result = yield reviews_service_1.reviewServices.getSinglereview(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'get one review  successfully',
        data: result,
    });
}));
exports.reviewController = {
    addreviewToDB,
    getAllreviews,
    deletereview,
    getSinglereview,
    updatereview,
};
