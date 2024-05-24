import { User } from '@prisma/client'

export namespace CreateUserUsecase {
  export const name = 'CreateUserUseCase'

  export type Params = User

  export type Result = Omit<User, 'password'>
}

export interface CreateUserUsecase {
  perform: (params: CreateUserUsecase.Params) => Promise<CreateUserUsecase.Result>
}
