'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const product_controller_1 = require('./product.controller')
const validateRequest_1 = __importDefault(
  require('../../middleware/validateRequest')
)
const product_validation_1 = require('./product.validation')
const router = express_1.default.Router()
router.post(
  '/add-product',
  (0, validateRequest_1.default)(
    product_validation_1.productValidation.createproductZodSchema
  ),
  product_controller_1.productController.addproductToDB
)
router.get(
  '/all-products',
  product_controller_1.productController.getAllproducts
)
router.get('/:id', product_controller_1.productController.getSingleproduct)
router.delete('/:id', product_controller_1.productController.deleteproduct)
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    product_validation_1.productValidation.updateproductZodSchema
  ),
  product_controller_1.productController.updateproduct
)
exports.default = router
