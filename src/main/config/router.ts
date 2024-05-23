import { Router, type Express } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

const routesDir = path.join(__dirname, '..', 'routes')

export const setRoutes = (app: Express): void => {
  const router = Router()
  const files = readdirSync(routesDir)

  for (const file of files) {
    if (file.includes('-routes') && !file.includes('.map')) {
      const module = require(path.join(routesDir, file))
      module.default(router)
    }
  }

  app.use(router)
}
