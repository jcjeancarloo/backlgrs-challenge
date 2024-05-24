import { Pet } from '@prisma/client'

export namespace Create {
  export type Params = Pet

  export type Result = Pet
}

export interface Create {
  create: (data: Create.Params) => Promise<Create.Result>
}
