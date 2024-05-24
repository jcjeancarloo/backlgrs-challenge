import * as PetRepository from '@/app/protocols/db/repositories/pets'
import { dbHelper } from '../database-helper'
export class PetPrismaRepository implements PetRepository.PetRepository {
  private prisma = dbHelper.client
  async create(params: PetRepository.Create.Params): Promise<PetRepository.Create.Result> {
    return await this.prisma.pet.create({
      data: params,
    })
  }
}
