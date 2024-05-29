/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { HttpError } from '@/app/errors'
import { type Controller } from '@/presentation/protocols'
import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import * as yup from 'yup'

export const adaptController = (controllerClassName: string) => {
  return async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const controller: Controller = container.resolve(controllerClassName)
      const httpResponse = await controller.handle({
        headers: req.headers,
        params: req.params,
        query: req.query,
        body: req.body,
        file: req.file,
        locals: res.locals,
      })
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          message: 'Validation error',
          errors: error.inner.map((err) => ({
            path: err.path,
            message: err.message,
          })),
        })
      } else if (error instanceof HttpError) {
        console.log(error.message)
        if (error.data) console.log(error.data)
        return res.status(error.httpResponse.statusCode).json(error.httpResponse.body)
      } else {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
      }
    }
  }
}
