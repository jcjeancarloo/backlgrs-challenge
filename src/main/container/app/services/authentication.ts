import { RecoverPasswordRepository } from '@/app/protocols/db/repositories/recover-password'
import { LoginService, ResetPasswordService } from '@/app/services'
import { LoginUsecase, ResetPasswordUsecase } from '@/domain/usecases'
import { RecoverPasswordPrismaRepository } from '@/infra/db/prisma/repositories'
import { container } from 'tsyringe'

container.register<LoginUsecase>('LoginUsecase', LoginService)
container.register<ResetPasswordUsecase>('ResetPasswordUsecase', ResetPasswordService)

container.register<RecoverPasswordRepository>(
  'RecoverPasswordRepository',
  RecoverPasswordPrismaRepository,
)

export default container
