'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.productController = void 0
const product_service_1 = require('./product.service')
const catchAsync_1 = require('../../shared/catchAsync')
const sendResponse_1 = require('../../shared/sendResponse')
const pick_1 = require('../../shared/pick')
const product_constant_1 = require('./product.constant')
const addproductToDB = (0, catchAsync_1.catchAsync)((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body
    const result = yield product_service_1.productServices.addproduct(
      productData
    )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'product added successfully',
      data: result,
    })
  })
)
const updateproduct = (0, catchAsync_1.catchAsync)((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = yield req.params
    const updateData = yield req.body
    console.log('updateData:', updateData)
    const result = yield product_service_1.productServices.updateproduct(
      id,
      updateData
    )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'product updated successfully',
      data: result,
    })
  })
)
const deleteproduct = (0, catchAsync_1.catchAsync)((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = yield req.params
    const result = yield product_service_1.productServices.deleteproduct(id)
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'product deleted successfully',
      data: result,
    })
  })
)
const getAllproducts = (0, catchAsync_1.catchAsync)((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.mapReqQuerysProperty)(
      req.query,
      product_constant_1.filterableFields
    )
    console.log('filters:', filters)
    const result = yield product_service_1.productServices.getAllproducts(
      filters
    )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'retrived all products  successfully',
      data: result,
    })
  })
)
const getSingleproduct = (0, catchAsync_1.catchAsync)((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = yield req.params
    const result = yield product_service_1.productServices.getSingleproduct(id)
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'get one product  successfully',
      data: result,
    })
  })
)
exports.productController = {
  addproductToDB,
  getAllproducts,
  deleteproduct,
  getSingleproduct,
  updateproduct,
}
