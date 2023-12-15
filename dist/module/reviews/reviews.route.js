"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const reviews_controller_1 = require("./reviews.controller");
// import { reviewValidation } from './reviews.validation'
const router = express_1.default.Router();
router.post('/add-review', 
// validateRequest(reviewValidation.createreviewZodSchema),
reviews_controller_1.reviewController.addreviewToDB);
router.get('/all-reviews', reviews_controller_1.reviewController.getAllreviews);
router.get('/:id', reviews_controller_1.reviewController.getSinglereview);
router.delete('/:id', reviews_controller_1.reviewController.deletereview);
router.patch('/:id', 
// validateRequest(reviewValidation.updatereviewZodSchema),
reviews_controller_1.reviewController.updatereview);
exports.reviewRouter = router;
