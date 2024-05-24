import { adaptController } from '@/main/adapters'
import { CreatePetController, ListPetsController } from '@/presentation/controllers'

import { type Express } from 'express'

export default (router: Express): void => {
  router.get('/pets', adaptController(ListPetsController.name))
  router.post('/pets', adaptController(CreatePetController.name))
}
