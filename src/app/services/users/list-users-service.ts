import type * as UserRepository from '@/app/protocols/db/repositories/users'
import { type ListUsersUsecase } from '@/domain/usecases/users'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListUsersService implements ListUsersUsecase {
  constructor(@inject('UserRepository') private readonly userRepository: UserRepository.List) {}
  async perform(params: ListUsersUsecase.Params): Promise<ListUsersUsecase.Result> {
    return this.userRepository.list(params)
  }
}
