import { ListUserController } from '@/presentation/controllers'
import { container } from 'tsyringe'

container.register<ListUserController>('ListUserController', ListUserController)

export default container
