import { BadRequestError } from '@/app/errors'
import { PetRepository } from '@/app/protocols/db/repositories/pets'
import { UpdatePetUsecase } from '@/domain/usecases'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdatePetService implements UpdatePetUsecase {
  constructor(
    @inject('PetRepository')
    private readonly petRepository: PetRepository,
  ) {}
  async perform(params: UpdatePetUsecase.Params): Promise<UpdatePetUsecase.Result> {
    const user = await this.petRepository.get({ id: params.id })
    if (!user) throw new BadRequestError('Pet not found')

    return this.petRepository.update(params)
  }
}
