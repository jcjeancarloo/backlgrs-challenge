import { GetApiStatusController, UploadImageController } from '@/presentation/controllers'
import { container } from 'tsyringe'

container.register<GetApiStatusController>('GetApiStatusController', GetApiStatusController)
container.register<UploadImageController>('UploadImageController', UploadImageController)

export default container
