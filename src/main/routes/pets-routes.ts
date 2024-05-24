import { adaptController } from '@/main/adapters'
import {
  AdoptPetController,
  CreatePetController,
  DeletePetController,
  ListPetsController,
  UpdatePetController,
} from '@/presentation/controllers'

import { type Express } from 'express'

export default (router: Express): void => {
  router.get('/pets', adaptController(ListPetsController.name))
  router.post('/pets', adaptController(CreatePetController.name))
  router.put('/pets/:id', adaptController(UpdatePetController.name))
  router.delete('/pets/:id', adaptController(DeletePetController.name))
  router.patch('/pets/:id', adaptController(AdoptPetController.name))
}
