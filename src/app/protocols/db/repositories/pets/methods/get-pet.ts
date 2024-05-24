import { Pet } from '@prisma/client'

export namespace Get {
  export type Params = {
    id: string
  }

  export type Result = Pet | null
}

export interface Get {
  get: (data: Get.Params) => Promise<Get.Result>
}
