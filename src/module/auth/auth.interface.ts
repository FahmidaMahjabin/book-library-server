export type IUser = {
  email: string
  password: string
  role: string
  userName: string
}
export type ILogin = {
  email: string
  password: string
}

export type ILoginResponse = {
  accessToken: string
}

export type IChangePassword = {
  oldPassword: string
  newPassword: string
}
