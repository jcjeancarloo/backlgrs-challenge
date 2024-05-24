import { Pet } from '@prisma/client'

export namespace CreatePetUsecase {
  export const name = 'CreatePetUsecase'

  export type Params = Pet

  export type Result = Pet
}

export interface CreatePetUsecase {
  perform: (params: CreatePetUsecase.Params) => Promise<CreatePetUsecase.Result>
}
