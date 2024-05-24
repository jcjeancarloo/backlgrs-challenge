import { LoginService } from '@/app/services'
import { LoginUsecase } from '@/domain/usecases'
import { container } from 'tsyringe'

container.register<LoginUsecase>('LoginUsecase', LoginService)

export default container
