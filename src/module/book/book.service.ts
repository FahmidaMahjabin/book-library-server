import { IBook } from './book.interface'
import { Book } from './book.model'
import { createAdminId, createFacultyId, createStudentId } from './users.utils'
import config from '../../config/index'
import { logger } from '../../shared/logger'
import { IStudent } from '../student/student.interface'
import { AcademicSemester } from '../academicSemester/academicSemster.model'
import mongoose from 'mongoose'
import { ApiError } from '../../errrorHandlers/ApiErrorHandler'

import { Student } from '../student/student.model'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
const addBook = async (book: IBook): Promise<IBook | null> => {
  const result = await Book.create(book)

  return result
}

const getAllBooks = async () => {
  const result = await Book.find({}).lean()
  // console.log('all users:', result)
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
