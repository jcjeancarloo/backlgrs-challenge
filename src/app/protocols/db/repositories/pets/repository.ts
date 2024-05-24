import { Create, List } from './methods'

export namespace PetRepository {
  export const name = 'PetRepository'
}

export interface PetRepository extends Create, List {}
