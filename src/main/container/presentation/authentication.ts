import {
  LoginController,
  ResetPasswordController,
  SetNewPasswordController,
} from '@/presentation/controllers/authentication'
import { container } from 'tsyringe'

container.register<LoginController>('LoginController', LoginController)
container.register<ResetPasswordController>('ResetPasswordController', ResetPasswordController)
container.register<SetNewPasswordController>('SetNewPasswordController', SetNewPasswordController)

export default container
