import { NextFunction, Request, RequestHandler, Response } from 'express'
import { reviewServices } from './reviews.service'

import { catchAsync } from '../../shared/catchAsync'
import { sendResponse } from '../../shared/sendResponse'
import { Ireview } from './reviews.interface'
import { ObjectId } from 'mongodb'
import { mapReqQuerysProperty } from '../../shared/pick'
import { filterableFields, paginationFields } from './reviews.constant'

const addreviewToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewData = req.body
    const result = await reviewServices.addreview(reviewData)

    sendResponse<Ireview>(res, {
      statusCode: 200,
      success: true,
      message: 'review added successfully',
      data: result,
    })
  }
)

const updatereview: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await req.params
    const updateData = await req.body
    console.log('updateData:', updateData)
    const result = await reviewServices.updatereview(
      id as unknown as ObjectId,
      updateData
    )
    sendResponse<Ireview>(res, {
      statusCode: 200,
      success: true,
      message: 'review updated successfully',
      data: result,
    })
  }
)

const deletereview: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await req.params
    const result = await reviewServices.deletereview(id as unknown as ObjectId)
    sendResponse<Ireview>(res, {
      statusCode: 200,
      success: true,
      message: 'review deleted successfully',
      data: result,
    })
  }
)

const getAllreviews: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = mapReqQuerysProperty(req.query, filterableFields)

    console.log('filters:', filters)

    const result = await reviewServices.getAllreviews(filters)
    sendResponse<Ireview[]>(res, {
      statusCode: 200,
      success: true,
      message: 'retrived all reviews  successfully',
      data: result,
    })
  }
)

const getSinglereview: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await req.params
    const result = await reviewServices.getSinglereview(
      id as unknown as ObjectId
    )
    sendResponse<Ireview>(res, {
      statusCode: 200,
      success: true,
      message: 'get one review  successfully',
      data: result,
    })
  }
)
export const reviewController = {
  addreviewToDB,
  getAllreviews,
  deletereview,
  getSinglereview,
  updatereview,
}
