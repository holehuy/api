const express = require('express')

const authRoute = require('./auth.route')
const masterDataRoute = require('./masterData.route')
const employeeRoute = require('./employee.route')
const userRoute = require('./user.route')
const mediaRoute = require('./media.route')
const examinationRoute = require('./examination.route')

const router = express.Router()
const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/master-data',
    route: masterDataRoute
  },
  {
    path: '/employee',
    route: employeeRoute
  },
  {
    path: '/user',
    route: userRoute
  },
  {
    path: '/media',
    route: mediaRoute
  },
  {
    path: '/examination',
    route: examinationRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router
