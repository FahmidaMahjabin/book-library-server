import { Schema, model } from 'mongoose'
import { Ireview, reviewModel } from './reviews.interface'
import config from '../../config'
import bcrypt from 'bcrypt'
const reviewSchema = new Schema<Ireview, reviewModel>(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)
// review.create() and review.save() ei duita function e pre() method use kora jay. create model e and save() model theke instance create kore use korte hoy.
// pre() function ta database e save or create er age kaj kore.
// important note: this use korte hole normal function use korte hobe not arrow function

// reviewSchema.pre('save', async function (next) {
//   console.log('this from review:', this)
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bcrypt_hash_salt_round)
//   )

//   next()
// })
export const Review = model<Ireview, reviewModel>('reviews', reviewSchema)
