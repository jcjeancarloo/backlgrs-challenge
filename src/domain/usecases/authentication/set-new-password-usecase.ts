export namespace SetNewPasswordUsecase {
  export const name = 'SetNewPasswordUsecase'

  export type Params = {
    email: string
    codeValidation: string
    newPassword: string
  }

  export type Result = void
}

export interface SetNewPasswordUsecase {
  perform: (params: SetNewPasswordUsecase.Params) => Promise<SetNewPasswordUsecase.Result>
}
