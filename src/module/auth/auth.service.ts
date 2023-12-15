import httpStatus from 'http-status'
import { ApiError } from '../../errrorHandlers/ApiErrorHandler'
import {
  IChangePassword,
  ILogin,
  ILoginResponse,
  IUser,
} from './auth.interface'

import bcrypt from 'bcrypt'
import { jwtHelper } from '../../helpers/jwt-token-helper'
import config from '../../config'
import { JwtPayload, Secret } from 'jsonwebtoken'
import { User } from '../auth/usr.model'

const signup = async (data: IUser): Promise<IUser> => {
  console.log('data from service:', data)
  const { password, ...others } = data
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_hash_salt_round)
  )
  const result = await User.create({
    password: hashedPassword,
    ...others,
  })
  return result
}

const login = async (payload: ILogin): Promise<ILoginResponse> => {
  const { email: userEmail, password } = payload
  const isUserExist = await User.findOne({ email: userEmail })
  // console.log('isUserExist:', isUserExist)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  const isPasswordMatch = await bcrypt.compare(password, isUserExist.password)
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password is incorrect')
  }

  const { email, role } = isUserExist

  const accessToken = jwtHelper.jwtTokenCreate(
    { email, role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )
  // console.log('accessToken from service:', accessToken)
  return { accessToken }
}

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload

  const isUserExist = await User.findOne({ email: user?.email })
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  const isPasswordMatch = await bcrypt.compare(
    oldPassword,
    isUserExist.password
  )
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect')
  }

  await User.updateOne({
    id: isUserExist?.id,
    password: await bcrypt.hash(
      newPassword,
      Number(config.bcrypt_hash_salt_round)
    ),
  })
}

const getMe = async (user: JwtPayload | null): Promise<IUser> => {
  const isUserExist = await User.findOne({ where: { email: user?.email } })
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  return isUserExist
}

const updateProfile = async (
  id: string,
  data: Partial<IUser>
): Promise<Partial<IUser>> => {
  const isUserExist = await User.findOne({ id })
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  const result = await User.updateOne({
    id: id,
    data,
  })
  return result
}

export const AuthService = {
  login,
  signup,
  changePassword,
  getMe,
  updateProfile,
}
