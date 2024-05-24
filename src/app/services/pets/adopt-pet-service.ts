import { BadRequestError } from '@/app/errors'
import { PetRepository } from '@/app/protocols/db/repositories/pets'
import { AdoptPetUsecase } from '@/domain/usecases'
import { inject, injectable } from 'tsyringe'

@injectable()
export class AdoptPetService implements AdoptPetUsecase {
  constructor(@inject('PetRepository') private readonly petRepository: PetRepository) {}
  async perform(params: AdoptPetUsecase.Params): Promise<AdoptPetUsecase.Result> {
    const pet = await this.petRepository.get({ id: params.id })
    if (!pet) throw new BadRequestError('Pet not found')

    return this.petRepository.update({
      id: params.id,
      userId: params.userId,
      isAvailable: false,
    })
  }
}
