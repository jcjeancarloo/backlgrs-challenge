import { Pet } from '@prisma/client'

export namespace UpdatePetUsecase {
  export const name = 'UpdatePetUsecase'
  export type Params = {
    id: string
    breed?: string
    isAvailable?: boolean
    userId?: string
    photo?: string
  }
  export type Result = Pet
}

export interface UpdatePetUsecase {
  perform: (data: UpdatePetUsecase.Params) => Promise<UpdatePetUsecase.Result>
}
