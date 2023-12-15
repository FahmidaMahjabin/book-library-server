import { Ireview, IreviewFilter } from './reviews.interface'
import { Review } from './reviews.model'

import config from '../../config/index'

import mongoose from 'mongoose'
import { ApiError } from '../../errrorHandlers/ApiErrorHandler'

import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
import { IResponseForPagination } from '../../interfaces/pagination'
import { searchableFields } from './reviews.constant'
const addreview = async (review: Ireview): Promise<Ireview | null> => {
  const result = await Review.create(review)

  return result
}

const getAllreviews = async (filters: IreviewFilter): Promise<Ireview[]> => {
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
  const result = await Review.find(whereCondition).sort('dec').limit(10)

  return result
}
const getSinglereview = async (id: ObjectId) => {
  const result = await Review.findById(id)
  return result
}
const updatereview = async (id: ObjectId, updateData: Partial<Ireview>) => {
  const result = await Review.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  })
  console.log('reslt:', result)
  return result
}
const deletereview = async (id: ObjectId) => {
  const result = await Review.findByIdAndDelete(id)
  return result
}
export const reviewServices = {
  addreview,
  getAllreviews,
  getSinglereview,
  updatereview,
  deletereview,
}
