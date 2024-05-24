import { BadRequestError } from '@/app/errors'
import { type Hasher } from '@/app/protocols/cryptography'
import * as RecoverPasswordRepository from '@/app/protocols/db/repositories/recover-password'
import * as UserRepository from '@/app/protocols/db/repositories/users'

import { SetNewPasswordUsecase } from '@/domain/usecases/authentication'
import { inject, injectable } from 'tsyringe'

@injectable()
export class SetNewPasswordService implements SetNewPasswordUsecase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UserRepository.GetByEmail & UserRepository.Update,
    @inject('RecoverPasswordRepository')
    private readonly recoverPasswordRepository: RecoverPasswordRepository.Get &
      RecoverPasswordRepository.Delete,
    @inject('Hasher') private readonly hasher: Hasher.Hash,
  ) {}

  private async getValidateRecoverPassword(codeValidation: string, userId: string) {
    const isAccountRecoverValid = await this.recoverPasswordRepository.get({
      codeValidation,
      userId,
    })

    if (!isAccountRecoverValid) throw new BadRequestError('Code validation not match')

    return isAccountRecoverValid
  }

  async perform({
    codeValidation,
    email,
    newPassword,
  }: SetNewPasswordUsecase.Params): Promise<SetNewPasswordUsecase.Result> {
    const user = await this.userRepository.getByEmail({ email })
    if (!user) throw new BadRequestError('User not found')

    const recoverPassword = await this.getValidateRecoverPassword(codeValidation, user.id)
    const hashedPassword = await this.hasher.hash(newPassword)

    await this.userRepository.update({
      id: user.id,
      password: hashedPassword,
    })

    await this.recoverPasswordRepository.delete({ id: recoverPassword.id })
  }
}
