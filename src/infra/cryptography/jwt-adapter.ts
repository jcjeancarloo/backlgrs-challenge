import { type Signer } from '@/app/protocols/cryptography'
import jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

@injectable()
export class JwtAdapter implements Signer {
  constructor(
    @inject('secret') private readonly secret: string,
    @inject('expiresInSeconds') private readonly expiresInSeconds: number,
  ) {
    this.secret = secret
  }

  async sign(params: Signer.Sign.Params): Promise<Signer.Sign.Result> {
    const accessToken = jwt.sign(params, this.secret, {
      expiresIn: this.expiresInSeconds,
    })
    return accessToken
  }
}
