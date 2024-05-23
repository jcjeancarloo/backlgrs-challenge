export namespace GetApiStatusUsecase {
  export const name = 'GetApiStatusUsecase'

  export type Result = {
    status: string
  }
}

export interface GetApiStatusUsecase {
  perform: () => Promise<GetApiStatusUsecase.Result>
}
