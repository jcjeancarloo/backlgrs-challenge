import { Create, Get, List, Update } from './methods'

export namespace PetRepository {
  export const name = 'PetRepository'
}

export interface PetRepository extends Create, List, Update, Get {}
