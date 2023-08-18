import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'
import { IFaculty } from '../faculty/faculty.interface'
import { IAdmin } from '../admin/admin.interface'

export type IBook = {
  title: string
  author: string
  genre: string
  publicationDate: string
  reviews?: string[]
}
export type IBookFilter = {
  searchTerm?: string
}
export type bookModel = Model<IBook, Record<string, never>>
