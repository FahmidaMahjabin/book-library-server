import { z } from 'zod'

import { designation } from '../faculty/faculty.constant'
import { ObjectId } from 'mongodb'
const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    author: z.string({
      required_error: 'author is required',
    }),
    genre: z.string({
      required_error: 'genre is required',
    }),
    publicationDate: z.string({
      required_error: 'date is required',
    }),
    reviews: z.string().array().optional(),
  }),
})

const updateBookZodSchema = z.object({
  body: z
    .object({
      title: z
        .string({
          required_error: 'title is required',
        })
        .optional(),
      author: z
        .string({
          required_error: 'author is required',
        })
        .optional(),
      genre: z
        .string({
          required_error: 'genre is required',
        })
        .optional(),
      publicationDate: z
        .string({
          required_error: 'date is required',
        })
        .optional(),
      reviews: z.string().array().optional(),
    })
    .optional(),
})
export const bookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
}