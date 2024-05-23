import { adaptController } from '@/main/adapters'
import { GetApiStatusController } from '@/presentation/controllers'
import { type Express } from 'express'

export default (router: Express): void => {
  router.get('/hc', adaptController(GetApiStatusController.name))
}
