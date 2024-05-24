import * as RecoverPasswordRepository from '@/app/protocols/db/repositories/recover-password'
import { dbHelper } from '../database-helper'
export class RecoverPasswordPrismaRepository
  implements RecoverPasswordRepository.RecoverPasswordRepository
{
  private prisma = dbHelper.client
  async create(
    params: RecoverPasswordRepository.Create.Params,
  ): Promise<RecoverPasswordRepository.Create.Result> {
    return await this.prisma.recoverPassword.create({
      data: params,
    })
  }

  async get(
    params: RecoverPasswordRepository.Get.Params,
  ): Promise<RecoverPasswordRepository.Get.Result> {
    return await this.prisma.recoverPassword.findFirst({
      where: params,
    })
  }

  async delete(
    params: RecoverPasswordRepository.Delete.Params,
  ): Promise<RecoverPasswordRepository.Delete.Result> {
    await this.prisma.recoverPassword.delete({
      where: { id: params.id },
    })
  }
}
