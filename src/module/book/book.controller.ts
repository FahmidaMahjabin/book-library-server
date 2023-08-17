import { NextFunction, Request, RequestHandler, Response } from 'express'
import { bookServices } from './book.service'
import { logger } from '../../shared/logger'
import { catchAsync } from '../../shared/catchAsync'
import { sendResponse } from '../../shared/sendResponse'
import { IBook } from './book.interface'
import { ObjectId } from 'mongodb'

const addBookToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookData = req.body
    const result = await bookServices.addBook(bookData)

    sendResponse<IBook>(res, {
      statusCode: 200,
      success: true,
      message: 'book added successfully',
      data: result,
    })
  }
)

const updateBook: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await req.params
    const updateData = await req.body
    console.log('updateData:', updateData)
    const result = await bookServices.updateBook(
      id as unknown as ObjectId,
      updateData
    )
    sendResponse<IBook>(res, {
      statusCode: 200,
      success: true,
      message: 'book updated successfully',
      data: result,
    })
  }
)

const deleteBook: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await req.params
    const result = await bookServices.deleteBook(id as unknown as ObjectId)
    sendResponse<IBook>(res, {
      statusCode: 200,
      success: true,
      message: 'book deleted successfully',
      data: result,
    })
  }
)

const getAllBooks: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookServices.getAllBooks()
    sendResponse<IBook[]>(res, {
      statusCode: 200,
      success: true,
      message: 'retrived all books  successfully',
      data: result,
    })
  }
)

const getSingleBook: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await req.params
    const result = await bookServices.getSingleBook(id as unknown as ObjectId)
    sendResponse<IBook>(res, {
      statusCode: 200,
      success: true,
      message: 'get one book  successfully',
      data: result,
    })
  }
)
export const bookController = {
  addBookToDB,
  getAllBooks,
  deleteBook,
  getSingleBook,
  updateBook,
}
