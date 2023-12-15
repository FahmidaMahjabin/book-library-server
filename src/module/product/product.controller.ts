import { NextFunction, Request, RequestHandler, Response } from 'express'
import { productServices } from './product.service'

import { catchAsync } from '../../shared/catchAsync'
import { IApiResponse, sendResponse } from '../../shared/sendResponse'
import { Iproduct } from './product.interface'
import { ObjectId } from 'mongodb'
import { mapReqQuerysProperty } from '../../shared/pick'
import { filterableFields, paginationFields } from './product.constant'

const addproductToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const productData = req.body
    const result = await productServices.addproduct(productData)

    sendResponse<Iproduct>(res, {
      statusCode: 200,
      success: true,
      message: 'product added successfully',
      data: result,
    })
  }
)

const updateproduct: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await req.params
    const updateData = await req.body
    console.log('updateData:', updateData)
    const result = await productServices.updateproduct(
      id as unknown as ObjectId,
      updateData
    )
    sendResponse<Iproduct>(res, {
      statusCode: 200,
      success: true,
      message: 'product updated successfully',
      data: result,
    })
  }
)

const deleteproduct: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await req.params
    const result = await productServices.deleteproduct(
      id as unknown as ObjectId
    )
    sendResponse<Iproduct>(res, {
      statusCode: 200,
      success: true,
      message: 'product deleted successfully',
      data: result,
    })
  }
)

const getAllproducts: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = mapReqQuerysProperty(req.query, filterableFields)

    console.log('filters:', filters)

    const result = await productServices.getAllproducts(filters)
    console.log('result from service:', result)
    sendResponse<Iproduct[]>(res, {
      statusCode: 200,
      success: true,
      message: 'retrived all products  successfully',
      data: result,
    })
  }
)

const getSingleproduct: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await req.params
    const result = await productServices.getSingleproduct(
      id as unknown as ObjectId
    )
    sendResponse<Iproduct>(res, {
      statusCode: 200,
      success: true,
      message: 'get one product  successfully',
      data: result,
    })
  }
)
export const productController = {
  addproductToDB,
  getAllproducts,
  deleteproduct,
  getSingleproduct,
  updateproduct,
}
