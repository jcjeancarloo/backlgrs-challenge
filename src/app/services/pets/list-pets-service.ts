import { PetRepository } from '@/app/protocols/db/repositories/pets'
import { ListPetsUsecase } from '@/domain/usecases'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListPetsService implements ListPetsUsecase {
  constructor(@inject('PetRepository') private readonly petRepository: PetRepository) {}
  async perform(params: ListPetsUsecase.Params): Promise<ListPetsUsecase.Result> {
    return this.petRepository.list(params)
  }
}
