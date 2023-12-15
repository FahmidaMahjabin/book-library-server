import express from 'express'
import { reviewController } from './reviews.controller'
import validateRequest from '../../middleware/validateRequest'
// import { reviewValidation } from './reviews.validation'

const router = express.Router()
router.post(
  '/add-review',
  // validateRequest(reviewValidation.createreviewZodSchema),
  reviewController.addreviewToDB
)

router.get('/all-reviews', reviewController.getAllreviews)
router.get('/:id', reviewController.getSinglereview)
router.delete('/:id', reviewController.deletereview)
router.patch(
  '/:id',
  // validateRequest(reviewValidation.updatereviewZodSchema),
  reviewController.updatereview
)

export const reviewRouter = router
