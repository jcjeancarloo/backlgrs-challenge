import { adaptController } from '@/main/adapters'
import {
  LoginController,
  ResetPasswordController,
  SetNewPasswordController,
} from '@/presentation/controllers/authentication'
import { type Express } from 'express'

export default (router: Express): void => {
  router.post('/auth', adaptController(LoginController.name))
  router.post('/auth/reset-password', adaptController(ResetPasswordController.name))
  router.post('/auth/set-new-password', adaptController(SetNewPasswordController.name))
}
