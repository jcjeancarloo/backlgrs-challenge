import { UnauthorizedError } from '@/app/errors'
import { Signer } from '@/app/protocols/cryptography'
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'

@injectable()
export class AuthenticationMiddleware implements Middleware {
  constructor(@inject('Signer') private readonly jwt: Signer) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { authorization = null } = httpRequest.headers
    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          message: new UnauthorizedError('No token provided').message,
        },
      }
    }

    const [, token] = authorization.split(' ')

    const verified = await this.jwt.verify(token)
    if (verified === undefined) {
      return {
        statusCode: 401,
        body: {
          message: new UnauthorizedError('Invalid token').message,
        },
      }
    }

    const decoded = await this.jwt.decode(token)

    return {
      statusCode: 0,
      body: {},
      locals: { user: decoded },
    }
  }
}
