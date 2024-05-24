import { CreatePetController } from '@/presentation/controllers'
import { container } from 'tsyringe'

container.register<CreatePetController>('CreatePetController', CreatePetController)

export default container
