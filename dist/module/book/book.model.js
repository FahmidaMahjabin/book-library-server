'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.product = void 0
const mongoose_1 = require('mongoose')
const productSchema = new mongoose_1.Schema(
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
// product.create() and product.save() ei duita function e pre() method use kora jay. create model e and save() model theke instance create kore use korte hoy.
// pre() function ta database e save or create er age kaj kore.
// important note: this use korte hole normal function use korte hobe not arrow function
// productSchema.pre('save', async function (next) {
//   console.log('this from product:', this)
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bcrypt_hash_salt_round)
//   )
//   next()
// })
exports.product = (0, mongoose_1.model)('products', productSchema)
