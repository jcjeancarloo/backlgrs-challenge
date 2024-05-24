import { Pet } from '@prisma/client'

export namespace List {
  export type Params = {
    breed?: string
    isAvailable?: boolean
  }

  export type Result = Pet[]
}

export interface List {
  list: (data: List.Params) => Promise<List.Result>
}
