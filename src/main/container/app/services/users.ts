import { UserRepository } from '@/app/protocols/db/repositories/users'
import { CreateUserService, ListUsersService } from '@/app/services/users'
import { CreateUserUsecase, ListUsersUsecase } from '@/domain/usecases/users'
import { UserPrismaRepository } from '@/infra/db/prisma/repositories/user-prisma-repository'
import { container } from 'tsyringe'

container.register<ListUsersUsecase>('ListUsersUsecase', ListUsersService)
container.register<CreateUserUsecase>('CreateUserUsecase', CreateUserService)

container.register<UserRepository>('UserRepository', UserPrismaRepository)

export default container
