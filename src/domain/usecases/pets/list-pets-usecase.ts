import { Pet } from '@prisma/client'

export namespace ListPetsUsecase {
  export const name = 'ListPetsUsecase'

  export type Params = {
    breed?: string
    isAvailable?: boolean
  }

  export type Result = Pet[]
}

export interface ListPetsUsecase {
  perform: (params: ListPetsUsecase.Params) => Promise<ListPetsUsecase.Result>
}
