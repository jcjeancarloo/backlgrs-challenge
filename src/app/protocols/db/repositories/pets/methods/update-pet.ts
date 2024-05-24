import { Pet } from '@prisma/client'

export namespace Update {
  export type Params = {
    id: string
    breed?: string
    isAvailable?: boolean
    userId?: string
    photo?: string
  }

  export type Result = Pet
}

export interface Update {
  update: (data: Update.Params) => Promise<Update.Result>
}
