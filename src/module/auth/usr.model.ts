import { Model, Schema, model } from 'mongoose'
import { IUser } from './auth.interface'

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
})
export type userModel = Model<IUser, Record<string, never>>
export const User = model<IUser, userModel>('User', userSchema)
