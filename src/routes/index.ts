import express from 'express'
import bookRoute from '../module/book/book.route'

// import { AcademicFaculty } from '../module/academicFaculty/academicFaculty.model'

const routes = express.Router()

const appRoutes = [{ path: '/book', route: bookRoute }]

appRoutes.forEach(route => routes.use(route.path, route.route))

export default routes
