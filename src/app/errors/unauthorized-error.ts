import { HttpError } from './http-error'

type DetailedError = {
  path?: string
  message: string
}

export class UnauthorizedError extends HttpError {
  constructor(customMessage?: string, code?: string, errors?: DetailedError[]) {
    const message = customMessage ?? 'Unauthorized'
    super(message, { statusCode: 401, body: { message, code, errors } })
    this.name = 'UnauthorizedError'
  }
}
