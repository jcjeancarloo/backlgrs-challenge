import { CreatePetController, ListPetsController } from '@/presentation/controllers'
import { container } from 'tsyringe'

container.register<CreatePetController>('CreatePetController', CreatePetController)
container.register<ListPetsController>('ListPetsController', ListPetsController)

export default container
