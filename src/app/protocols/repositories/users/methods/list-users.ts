import { User } from '@prisma/client'

export namespace List {
  export type Params = {}

  export type Result = Omit<User, 'password'>[]
}

export interface List {
  list: (data: List.Params) => Promise<List.Result>
}
