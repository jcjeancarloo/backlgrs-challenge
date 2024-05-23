import express, { type Express } from 'express'

import { errorHandler } from '../middlewares'
import { setMiddlewares } from './middlewares'
import { setRoutes } from './router'

export const setApp = (): Express => {
  const app = express()
  setMiddlewares(app)
  setRoutes(app)
  app.use(errorHandler)

  return app
}

export default setApp
