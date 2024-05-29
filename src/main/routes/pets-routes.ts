import { adaptController, adaptMiddleware } from '@/main/adapters'
import {
  AdoptPetController,
  CreatePetController,
  DeletePetController,
  ListPetsController,
  UpdatePetController,
} from '@/presentation/controllers'

import { type Express } from 'express'
import { AuthenticationMiddleware } from '../middlewares'

export default (router: Express): void => {
  router.get('/pets', adaptController(ListPetsController.name))
  router.post(
    '/pets',
    adaptMiddleware(AuthenticationMiddleware.name),
    adaptController(CreatePetController.name),
  )
  router.put(
    '/pets/:id',
    adaptMiddleware(AuthenticationMiddleware.name),
    adaptController(UpdatePetController.name),
  )
  router.delete(
    '/pets/:id',
    adaptMiddleware(AuthenticationMiddleware.name),
    adaptController(DeletePetController.name),
  )
  router.patch(
    '/pets/:id',
    adaptMiddleware(AuthenticationMiddleware.name),
    adaptController(AdoptPetController.name),
  )
}
