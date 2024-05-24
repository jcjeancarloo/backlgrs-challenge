import { Create, Get, GetByEmail, List, Update } from './methods'

export namespace UserRepository {
  export const name = 'UserRepository'
}

export interface UserRepository extends Create, List, GetByEmail, Update, Get {}
