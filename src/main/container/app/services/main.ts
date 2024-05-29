import { GetApiStatusService, UploadImageService } from '@/app/services/main'
import { GetApiStatusUsecase, UploadImageUsecase } from '@/domain/usecases/main'
import { container } from 'tsyringe'

container.register<GetApiStatusUsecase>('GetApiStatusUsecase', GetApiStatusService)
container.register<UploadImageUsecase>('UploadImageUsecase', UploadImageService)

export default container
