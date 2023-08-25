import { Model, Types } from 'mongoose'

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
