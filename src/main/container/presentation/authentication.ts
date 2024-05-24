import { LoginController, ResetPasswordController } from '@/presentation/controllers/authentication'
import { container } from 'tsyringe'

container.register<LoginController>('LoginController', LoginController)
container.register<ResetPasswordController>('ResetPasswordController', ResetPasswordController)

export default container
