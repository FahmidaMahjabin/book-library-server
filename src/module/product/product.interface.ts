import { Model, Types } from 'mongoose'

export type Iproduct = {
  title: string
  category: string
  description: string
  picture: string
  balance: number
  review?: string[]
  rating: number
  isAvailable: boolean
  stock: number
  size: string[]
  color: string[]
}
export type IproductFilter = {
  searchTerm?: string
}
export type productModel = Model<Iproduct, Record<string, never>>
