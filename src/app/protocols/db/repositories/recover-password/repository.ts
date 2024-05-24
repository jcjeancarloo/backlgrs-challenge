import { Create, Delete, Get } from './methods'

export namespace RecoverPasswordRepository {
  export const name = 'RecoverPasswordRepository'
}

export interface RecoverPasswordRepository extends Create, Get, Delete {}
