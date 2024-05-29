import { type Middleware } from '@/presentation/protocols'
import { type NextFunction, type Request, type Response } from 'express'
import { container } from 'tsyringe'

export const adaptMiddleware = (middlewareClassname: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const middleware: Middleware = container.resolve(middlewareClassname)
    const { statusCode, body, locals } = await middleware.handle({
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body,
      locals: res.locals,
    })
    if (locals !== undefined) {
      res.locals = Object.assign(res.locals, locals)
    }
    if (statusCode !== 0) {
      return res.status(statusCode).json(body)
    }

    next()
  }
}
