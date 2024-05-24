import { CreateUserController, ListUserController } from '@/presentation/controllers'
import { container } from 'tsyringe'

container.register<ListUserController>('ListUserController', ListUserController)
container.register<CreateUserController>('CreateUserController', CreateUserController)

export default container
