import { Schema, model } from 'mongoose'
import { IBook, bookModel } from './book.interface'
import config from '../../config'
import bcrypt from 'bcrypt'
const bookSchema = new Schema<IBook, bookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    reviews: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
)
// book.create() and book.save() ei duita function e pre() method use kora jay. create model e and save() model theke instance create kore use korte hoy.
// pre() function ta database e save or create er age kaj kore.
// important note: this use korte hole normal function use korte hobe not arrow function

// bookSchema.pre('save', async function (next) {
//   console.log('this from book:', this)
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bcrypt_hash_salt_round)
//   )

//   next()
// })
export const Book = model<IBook, bookModel>('books', bookSchema)
