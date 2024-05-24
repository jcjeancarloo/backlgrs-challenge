import { RecoverPassword } from '@prisma/client'

export namespace Create {
  export type Params = Omit<RecoverPassword, 'id' | 'createdAt' | 'updatedAt'>

  export type Result = RecoverPassword
}

export interface Create {
  create: (data: Create.Params) => Promise<Create.Result>
}
