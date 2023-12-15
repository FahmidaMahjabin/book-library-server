import express from 'express'
import { productRouter } from '../module/product/product.route'
import { reviewRouter } from '../module/reviews/reviews.route'
import { AuthRoutes } from '../module/auth/auth.route'

// import { AcademicFaculty } from '../module/academicFaculty/academicFaculty.model'

const routes = express.Router()

const appRoutes = [
  { path: '/product', route: productRouter },
  { path: '/review', route: reviewRouter },
  {
    path: '/auth',
    route: AuthRoutes,
  },
]

appRoutes.forEach(route => routes.use(route.path, route.route))

export default routes
