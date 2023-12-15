import { z } from 'zod'

const signUpZodSchema = z.object({
  body: z.object({
    userName: z.string({
      required_error: 'user Name is required',
    }),
    role: z.string({
      required_error: 'Role is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),

    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({
      required_error: 'New password is required',
    }),
  }),
})

export const AuthValidation = {
  loginZodSchema,
  changePasswordZodSchema,
  signUpZodSchema,
}
