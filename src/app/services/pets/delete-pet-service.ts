import { BadRequestError } from '@/app/errors'
import { PetRepository } from '@/app/protocols/db/repositories/pets'
import { DeletePetUsecase, UpdatePetUsecase } from '@/domain/usecases'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeletePetService implements DeletePetUsecase {
  constructor(@inject('PetRepository') private readonly petRepository: PetRepository) {}
  async perform(params: UpdatePetUsecase.Params): Promise<DeletePetUsecase.Result> {
    const user = await this.petRepository.get({ id: params.id })
    if (!user) throw new BadRequestError('Pet not found')

    await this.petRepository.delete(params)
  }
}
