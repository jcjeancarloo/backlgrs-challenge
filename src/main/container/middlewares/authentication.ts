import { AuthenticationMiddleware } from '@/main/middlewares'
import { container } from 'tsyringe'

container.register<AuthenticationMiddleware>('AuthenticationMiddleware', AuthenticationMiddleware)

export default container
