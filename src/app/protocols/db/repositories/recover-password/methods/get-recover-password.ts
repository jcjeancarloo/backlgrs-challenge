import { RecoverPassword } from '@prisma/client'

export namespace Get {
  export type Params = {
    userId: string
    codeValidation: string
  }

  export type Result = RecoverPassword | null
}

export interface Get {
  get: (data: Get.Params) => Promise<Get.Result>
}
