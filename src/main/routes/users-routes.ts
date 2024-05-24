import { adaptController } from '@/main/adapters'
import { ListUserController } from '@/presentation/controllers/users/list-users-controller'

import { type Express } from 'express'

export default (router: Express): void => {
  router.get('/users', adaptController(ListUserController.name))
}
