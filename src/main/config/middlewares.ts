import express, { type Express } from 'express'
import path from 'path'
import { bodyParser, contentType, cors } from '../middlewares'

export const setMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  app.use('/public', express.static(path.join(__dirname, '..', '..', '..', 'public')))
}
