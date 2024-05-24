import { LoginController } from '@/presentation/controllers/authentication'
import { container } from 'tsyringe'

container.register<LoginController>('LoginController', LoginController)

export default container
