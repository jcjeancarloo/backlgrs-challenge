import { BadRequestError } from '@/app/errors'
import { type Hasher, type Signer } from '@/app/protocols/cryptography'
import type * as UserRepository from '@/app/protocols/db/repositories/users'

import { LoginUsecase } from '@/domain/usecases/authentication'
import { inject, injectable } from 'tsyringe'

@injectable()
export class LoginService implements LoginUsecase {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository.GetByEmail,
    @inject('Signer') private readonly signer: Signer.Sign,
    @inject('Hasher') private readonly hasher: Hasher.Compare,
  ) {}

  async perform(params: LoginUsecase.Params): Promise<LoginUsecase.Result> {
    const user = await this.userRepository.getByEmail({ email: params.email })

    const checkCredentials = user && (await this.hasher.compare(params.password, user.password))
    if (!checkCredentials) throw new BadRequestError('E-mail or password invalid')

    const access_token = await this.signer.sign(user)

    const { password, ...withoutPassword } = user

    return { ...withoutPassword, access_token }
  }
}
