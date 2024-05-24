import { type Hasher } from '@/app/protocols/cryptography/hasher'
import type * as UserRepository from '@/app/protocols/db/repositories/users'
import { type CreateUserUsecase } from '@/domain/usecases/users'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateUserService implements CreateUserUsecase {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository.Create,
    @inject('Hasher') private readonly hasher: Hasher.Hash,
  ) {}
  async perform(params: CreateUserUsecase.Params): Promise<CreateUserUsecase.Result> {
    const passwordHash = await this.hasher.hash(params.password)

    const user = await this.userRepository.create({ ...params, password: passwordHash })
    return user
  }
}
