import express from 'express'
import { productController } from './product.controller'
import validateRequest from '../../middleware/validateRequest'
import { productValidation } from './product.validation'

const router = express.Router()
router.post(
  '/add-product',
  // validateRequest(productValidation.createproductZodSchema),
  productController.addproductToDB
)

router.get('/all-products', productController.getAllproducts)
router.get('/:id', productController.getSingleproduct)
router.delete('/:id', productController.deleteproduct)
router.patch(
  '/:id',
  validateRequest(productValidation.updateproductZodSchema),
  productController.updateproduct
)

export const productRouter = router
