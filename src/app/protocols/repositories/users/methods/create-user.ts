import { User } from '@prisma/client'

export namespace Create {
  export type Params = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

  export type Result = Omit<User, 'password'>
}

export interface Create {
  create: (data: Create.Params) => Promise<Create.Result>
}
