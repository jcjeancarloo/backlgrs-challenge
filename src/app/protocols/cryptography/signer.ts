export namespace Signer {
  export const name = 'Signer'

  export namespace Sign {
    export type Params = Record<string, any> | string
    export type Result = string
  }
  export interface Sign {
    sign: (payload: Sign.Params) => Promise<Sign.Result>
  }
}

export interface Signer extends Signer.Sign {}
