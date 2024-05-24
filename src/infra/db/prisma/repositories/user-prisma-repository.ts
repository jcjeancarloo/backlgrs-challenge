import * as UserRepository from '@/app/protocols/repositories/users'
import { excludeAttribute } from '@/utils'
import { dbHelper } from '../database-helper'
export class UserPrismaRepository implements UserRepository.UserRepository {
  private prisma = dbHelper.client
  async create(params: UserRepository.Create.Params): Promise<UserRepository.Create.Result> {
    return await this.prisma.user.create({
      data: params,
    })
  }

  async list(params: UserRepository.List.Params): Promise<UserRepository.List.Result> {
    return await this.prisma.user.findMany({
      where: params,
    })
  }

  async getByEmail(
    params: UserRepository.GetByEmail.Params,
  ): Promise<UserRepository.GetByEmail.Result> {
    const user = await this.prisma.user.findUnique({
      where: params,
    })

    if (user) {
      const withoutAttrs = excludeAttribute(user, ['createdAt', 'updatedAt'])
      return withoutAttrs as UserRepository.GetByEmail.Result
    }

    return user
  }

  async update(params: UserRepository.Update.Params): Promise<UserRepository.Update.Result> {
    const user = await this.prisma.user.update({
      where: { id: params.id },
      data: params,
    })
    const withoutPassword = excludeAttribute(user, ['password'])
    return withoutPassword as UserRepository.Update.Result
  }
}
