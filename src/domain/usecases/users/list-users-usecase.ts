import { User } from '@prisma/client'

export namespace ListUsersUsecase {
  export const name = 'ListUsersUsecase'

  export type Params = {}

  export type Result = Omit<User, 'password'>[]
}

export interface ListUsersUsecase {
  perform: (params: ListUsersUsecase.Params) => Promise<ListUsersUsecase.Result>
}
