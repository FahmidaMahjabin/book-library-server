import { IBook, IBookFilter } from './book.interface'
import { Book } from './book.model'

import config from '../../config/index'

import mongoose from 'mongoose'
import { ApiError } from '../../errrorHandlers/ApiErrorHandler'

import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
import { IResponseForPagination } from '../../interfaces/pagination'
import { searchableFields } from './book.constant'
const addBook = async (book: IBook): Promise<IBook | null> => {
  const result = await Book.create(book)

  return result
}

const getAllBooks = async (filters: IBookFilter): Promise<IBook[]> => {
  const { searchTerm, ...filterableFields } = filters
  console.log('filterableFields:', filterableFields)
  const andConditions = []

  // add searchTerm to the andCondition
  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filterableFields).length) {
    andConditions.push({
      $or: Object.entries(filterableFields).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  console.log('andConditions:', andConditions)

  // search condition
  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await Book.find(whereCondition).sort('dec').limit(10)

  return result
}
const getSingleBook = async (id: ObjectId) => {
  const result = await Book.findById(id)
  return result
}
const updateBook = async (id: ObjectId, updateData: Partial<IBook>) => {
  const result = await Book.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  })
  console.log('reslt:', result)
  return result
}
const deleteBook = async (id: ObjectId) => {
  const result = await Book.findByIdAndDelete(id)
  return result
}
export const bookServices = {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
}
