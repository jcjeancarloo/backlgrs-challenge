import { BadRequestError } from '@/app/errors'
import { type Hasher } from '@/app/protocols/cryptography/hasher'
import type * as UserRepository from '@/app/protocols/db/repositories/users'
import { SendEmail } from '@/app/protocols/e-mail'
import { type CreateUserUsecase } from '@/domain/usecases/users'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateUserService implements CreateUserUsecase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UserRepository.Create & UserRepository.GetByEmail,
    @inject('Hasher') private readonly hasher: Hasher.Hash,
    @inject('EmailManager')
    private readonly sendEmail: SendEmail,
  ) {}
  async perform(params: CreateUserUsecase.Params): Promise<CreateUserUsecase.Result> {
    const user = await this.userRepository.getByEmail({ email: params.email })
    if (user) throw new BadRequestError('User already exists')

    const passwordHash = await this.hasher.hash(params.password)

    const createdUser = await this.userRepository.create({ ...params, password: passwordHash })

    try {
      await this.sendEmail.sendEmail({
        to: createdUser.email,
        subject: 'PetAdote ❤️ - Bem vindo!',
        text: `Explore nosso site e dê um lar para um novo amigo`,
      })
    } catch (error) {
      throw new BadRequestError('Error sending recovery password e-mail')
    }

    return createdUser
  }
}
