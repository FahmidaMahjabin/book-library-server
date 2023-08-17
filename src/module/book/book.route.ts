import express from 'express'
import { bookController } from './book.controller'
import validateRequest from '../../middleware/validateRequest'
import { bookValidation } from './book.validation'

const router = express.Router()
router.post(
  '/add-book',
  validateRequest(bookValidation.createBookZodSchema),
  bookController.addBookToDB
)

router.get('/all-books', bookController.getAllBooks)
router.get('/:id', bookController.getSingleBook)
router.delete('/:id', bookController.deleteBook)
router.patch(
  '/:id',
  validateRequest(bookValidation.updateBookZodSchema),
  bookController.updateBook
)

export default router
