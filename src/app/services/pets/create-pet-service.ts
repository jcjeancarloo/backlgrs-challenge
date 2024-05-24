import type * as PetRepository from '@/app/protocols/db/repositories/pets'
import { CreatePetUsecase } from '@/domain/usecases'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreatePetService implements CreatePetUsecase {
  constructor(@inject('PetRepository') private readonly petRepository: PetRepository.Create) {}
  async perform(params: CreatePetUsecase.Params): Promise<CreatePetUsecase.Result> {
    return await this.petRepository.create(params)
  }
}
