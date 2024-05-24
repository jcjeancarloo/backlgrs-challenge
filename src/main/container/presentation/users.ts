import {
  CreateUserController,
  ListUserController,
  UpdatePetController,
} from '@/presentation/controllers'
import { container } from 'tsyringe'

container.register<ListUserController>('ListUserController', ListUserController)
container.register<CreateUserController>('CreateUserController', CreateUserController)
container.register<UpdatePetController>('UpdatePetController', UpdatePetController)

export default container
