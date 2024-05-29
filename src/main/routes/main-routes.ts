import { adaptController, adaptMiddleware } from '@/main/adapters'
import { GetApiStatusController, UploadImageController } from '@/presentation/controllers'
import { type Express } from 'express'
import { AuthenticationMiddleware } from '../middlewares'
import { upload } from '../middlewares/multer'

export default (router: Express): void => {
  router.get('/hc', adaptController(GetApiStatusController.name))
  router.post(
    '/upload-img',
    upload.single('file'),
    adaptMiddleware(AuthenticationMiddleware.name),
    adaptController(UploadImageController.name),
  )
}
