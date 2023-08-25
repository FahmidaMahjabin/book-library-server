"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const book_validation_1 = require("./book.validation");
const router = express_1.default.Router();
router.post('/add-book', (0, validateRequest_1.default)(book_validation_1.bookValidation.createBookZodSchema), book_controller_1.bookController.addBookToDB);
router.get('/all-books', book_controller_1.bookController.getAllBooks);
router.get('/:id', book_controller_1.bookController.getSingleBook);
router.delete('/:id', book_controller_1.bookController.deleteBook);
router.patch('/:id', (0, validateRequest_1.default)(book_validation_1.bookValidation.updateBookZodSchema), book_controller_1.bookController.updateBook);
exports.default = router;
