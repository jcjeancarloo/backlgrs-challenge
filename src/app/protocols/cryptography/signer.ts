export namespace Signer {
  export const name = 'Signer'

  export namespace Sign {
    export type Params = Record<string, any> | string
    export type Result = string
  }
  export interface Sign {
    sign: (payload: Sign.Params) => Promise<Sign.Result>
  }

  export namespace Verify {
    export type Param = string
    export type Result =
      | {
          sub?: string
          exp?: number
          iat?: number
          [key: string]: any
        }
      | string
      | undefined
  }
  export interface Verify {
    verify: (token: Verify.Param) => Promise<Verify.Result>
  }

  export namespace Decode {
    export type Param = string
    export type Result =
      | {
          sub?: string
          exp?: number
          iat?: number
          [key: string]: any
        }
      | string
      | undefined
  }
  export interface Decode {
    decode: (param: Decode.Param) => Promise<Decode.Result>
  }
}

export interface Signer extends Signer.Sign, Signer.Verify, Signer.Decode {}
