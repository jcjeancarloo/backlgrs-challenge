export namespace DeletePetUsecase {
  export const name = 'DeletePetUsecase'
  export type Params = {
    id: string
  }
  export type Result = void
}

export interface DeletePetUsecase {
  perform: (data: DeletePetUsecase.Params) => Promise<DeletePetUsecase.Result>
}
