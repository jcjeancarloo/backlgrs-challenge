import { HttpError } from './http-error'

export class BadGatewayError extends HttpError {
  constructor(data?: any, customMessage?: string) {
    const message = customMessage ?? 'Bad Gateway'
    super(message, { statusCode: 502, body: { message } })
    this.name = 'BadGatewayError'
    this.data = data
  }
}
