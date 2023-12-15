import { Iproduct, IproductFilter } from './product.interface'
import { Product } from './product.model'

import config from '../../config/index'

import mongoose from 'mongoose'
import { ApiError } from '../../errrorHandlers/ApiErrorHandler'

import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
import { IResponseForPagination } from '../../interfaces/pagination'
import { searchableFields } from './product.constant'
const addproduct = async (product: Iproduct): Promise<Iproduct | null> => {
  const result = await Product.create(product)

  return result
}

const getAllproducts = async (filters: IproductFilter): Promise<Iproduct[]> => {
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
  const result = await Product.find(whereCondition)

  return result
}
const getSingleproduct = async (id: ObjectId) => {
  const result = await Product.findById(id)
  return result
}
const updateproduct = async (id: ObjectId, updateData: Partial<Iproduct>) => {
  const result = await Product.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  })
  console.log('reslt:', result)
  return result
}
const deleteproduct = async (id: ObjectId) => {
  const result = await Product.findByIdAndDelete(id)
  return result
}
export const productServices = {
  addproduct,
  getAllproducts,
  getSingleproduct,
  updateproduct,
  deleteproduct,
}
