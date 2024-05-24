export namespace ResetPasswordUsecase {
  export const name = 'ResetPasswordUsecase'

  export type Params = {
    email: string
  }

  export type Result = void
}

export interface ResetPasswordUsecase {
  perform: (params: ResetPasswordUsecase.Params) => Promise<ResetPasswordUsecase.Result>
}
