import { User } from '@prisma/client'

export namespace GetByEmail {
  export type Params = {
    email: string
  }

  export type Result = User | null
}

export interface GetByEmail {
  getByEmail: (data: GetByEmail.Params) => Promise<GetByEmail.Result>
}
