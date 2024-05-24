import { Pet } from '@prisma/client'

export namespace AdoptPetUsecase {
  export const name = 'AdoptPetUsecase'
  export type Params = {
    id: string
    userId: string
  }
  export type Result = Pet
}

export interface AdoptPetUsecase {
  perform: (data: AdoptPetUsecase.Params) => Promise<AdoptPetUsecase.Result>
}
