import { GetApiStatusController } from '@/presentation/controllers'
import { container } from 'tsyringe'

container.register<GetApiStatusController>('GetApiStatusController', GetApiStatusController)

export default container
