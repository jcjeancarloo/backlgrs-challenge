import { HttpError } from '@/app/errors'
import { type NextFunction, type Request, type Response } from 'express'
import * as yup from 'yup'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  if (error instanceof yup.ValidationError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.inner.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    })
  } else if (error instanceof HttpError) {
    if (error.data) console.log(error.data)
    return res.status(error.httpResponse.statusCode).json(error.httpResponse.body)
  } else {
    console.log(error)
    return res.status(500).json({ message: 'Server error' })
  }
}
