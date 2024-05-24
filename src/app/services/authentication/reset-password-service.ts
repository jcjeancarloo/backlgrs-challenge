import { BadRequestError } from '@/app/errors'
import { RecoverPasswordRepository } from '@/app/protocols/db/repositories/recover-password'

import { UserRepository } from '@/app/protocols/db/repositories/users'
import { SendEmail } from '@/app/protocols/e-mail'

import { ResetPasswordUsecase } from '@/domain/usecases/authentication'
import { generateUniqueToken } from '@/utils'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ResetPasswordService implements ResetPasswordUsecase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
    @inject('EmailManager')
    private readonly sendEmail: SendEmail,
    @inject('RecoverPasswordRepository')
    private readonly recoverPasswordRepository: RecoverPasswordRepository,
  ) {}

  async perform({ email }: ResetPasswordUsecase.Params): Promise<ResetPasswordUsecase.Result> {
    const user = await this.userRepository.getByEmail({ email })
    if (!user) throw new BadRequestError('User not found')

    const uniqueToken = generateUniqueToken()

    const recoverPassword = await this.recoverPasswordRepository.create({
      codeValidation: uniqueToken,
      userId: user.id,
    })

    if (!recoverPassword) throw new BadRequestError('Error recoverying user password')

    try {
      await this.sendEmail.sendEmail({
        to: user.email,
        subject: 'PetAdote ❤️ - Recuperar Senha',
        text: `Seu código para recuperação de senha: ${uniqueToken}`,
      })
    } catch (error) {
      throw new BadRequestError('Error sending recovery password e-mail')
    }
  }
}
