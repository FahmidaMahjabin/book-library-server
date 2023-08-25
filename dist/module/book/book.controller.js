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
exports.bookController = void 0;
const book_service_1 = require("./book.service");
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const pick_1 = require("../../shared/pick");
const book_constant_1 = require("./book.constant");
const addBookToDB = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    const result = yield book_service_1.bookServices.addBook(bookData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'book added successfully',
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = yield req.params;
    const updateData = yield req.body;
    console.log('updateData:', updateData);
    const result = yield book_service_1.bookServices.updateBook(id, updateData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'book updated successfully',
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = yield req.params;
    const result = yield book_service_1.bookServices.deleteBook(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'book deleted successfully',
        data: result,
    });
}));
const getAllBooks = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.mapReqQuerysProperty)(req.query, book_constant_1.filterableFields);
    console.log('filters:', filters);
    const result = yield book_service_1.bookServices.getAllBooks(filters);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'retrived all books  successfully',
        data: result,
    });
}));
const getSingleBook = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = yield req.params;
    const result = yield book_service_1.bookServices.getSingleBook(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'get one book  successfully',
        data: result,
    });
}));
exports.bookController = {
    addBookToDB,
    getAllBooks,
    deleteBook,
    getSingleBook,
    updateBook,
};
