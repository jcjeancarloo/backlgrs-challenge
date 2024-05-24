import { adaptController } from '@/main/adapters'
import { CreateUserController, ListUserController } from '@/presentation/controllers'

import { type Express } from 'express'

export default (router: Express): void => {
  router.post('/users', adaptController(CreateUserController.name))
  router.get('/users', adaptController(ListUserController.name))
}
