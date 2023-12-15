import { Model, Types } from 'mongoose'

export type Ireview = {
  name: string
  rating: number
  comment: string
  image?: string
}
export type IreviewFilter = {
  searchTerm?: string
}
export type reviewModel = Model<Ireview, Record<string, never>>
