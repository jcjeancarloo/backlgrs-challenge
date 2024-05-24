import { adaptController } from '@/main/adapters'
import { CreatePetController } from '@/presentation/controllers'

import { type Express } from 'express'

export default (router: Express): void => {
  router.post('/pets', adaptController(CreatePetController.name))
}
