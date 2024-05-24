import {
  AdoptPetController,
  CreatePetController,
  DeletePetController,
  ListPetsController,
  UpdatePetController,
} from '@/presentation/controllers'
import { container } from 'tsyringe'

container.register<CreatePetController>('CreatePetController', CreatePetController)
container.register<ListPetsController>('ListPetsController', ListPetsController)
container.register<UpdatePetController>('UpdatePetController', UpdatePetController)
container.register<DeletePetController>('DeletePetController', DeletePetController)
container.register<AdoptPetController>('AdoptPetController', AdoptPetController)

export default container
