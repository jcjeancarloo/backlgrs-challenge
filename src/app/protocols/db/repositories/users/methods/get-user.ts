import { User } from '@prisma/client'

export namespace Get {
  export type Params = {
    id: string
  }

  export type Result = User | null
}

export interface Get {
  get: (data: Get.Params) => Promise<Get.Result>
}
