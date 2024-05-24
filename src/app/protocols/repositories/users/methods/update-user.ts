import { User } from '@prisma/client'

export namespace Update {
  export type Params = {
    id: string
    password?: string
  }

  export type Result = Omit<User, 'password'>
}

export interface Update {
  update: (data: Update.Params) => Promise<Update.Result>
}
