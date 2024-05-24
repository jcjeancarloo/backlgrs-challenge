import { adaptController } from '@/main/adapters'
import { LoginController } from '@/presentation/controllers/authentication'
import { type Express } from 'express'

export default (router: Express): void => {
  router.post('/auth', adaptController(LoginController.name))
}
