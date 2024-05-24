import * as PetRepository from '@/app/protocols/db/repositories/pets'
import { dbHelper } from '../database-helper'
export class PetPrismaRepository implements PetRepository.PetRepository {
  private prisma = dbHelper.client
  async create(params: PetRepository.Create.Params): Promise<PetRepository.Create.Result> {
    return await this.prisma.pet.create({
      data: params,
    })
  }

  async list(params: PetRepository.List.Params): Promise<PetRepository.List.Result> {
    return await this.prisma.pet.findMany({
      where: params,
    })
  }
  async get(params: PetRepository.Get.Params): Promise<PetRepository.Get.Result> {
    return await this.prisma.pet.findUnique({
      where: { id: params.id },
    })
  }

  async update(params: PetRepository.Update.Params): Promise<PetRepository.Update.Result> {
    return await this.prisma.pet.update({
      where: { id: params.id },
      data: params,
    })
  }
}
