import { User } from '@prisma/client'

export namespace LoginUsecase {
  export const name = 'LoginUsecase'

  export type Params = {
    email: string
    password: string
  }

  export type Result = Omit<User, 'password' | 'createdAt' | 'updatedAt'> & {
    access_token: string
  }
}

export interface LoginUsecase {
  perform: (params: LoginUsecase.Params) => Promise<LoginUsecase.Result>
}
