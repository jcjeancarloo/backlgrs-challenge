import { UserRepository } from '@/app/protocols/db/repositories/users'
import { ListUsersService } from '@/app/services/users'
import { ListUsersUsecase } from '@/domain/usecases/users'
import { UserPrismaRepository } from '@/infra/db/prisma/repositories/user-prisma-repository'
import { container } from 'tsyringe'

container.register<ListUsersUsecase>('ListUsersUsecase', ListUsersService)

container.register<UserRepository>('UserRepository', UserPrismaRepository)

export default container
