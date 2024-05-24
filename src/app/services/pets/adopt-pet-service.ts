import { BadRequestError } from '@/app/errors'
import * as PetRepository from '@/app/protocols/db/repositories/pets'
import * as UserRepository from '@/app/protocols/db/repositories/users'
import { AdoptPetUsecase } from '@/domain/usecases'
import { inject, injectable } from 'tsyringe'

@injectable()
export class AdoptPetService implements AdoptPetUsecase {
  constructor(
    @inject('PetRepository')
    private readonly petRepository: PetRepository.Get & PetRepository.Update,
    @inject('UserRepository') private readonly userRepository: UserRepository.Get,
  ) {}
  async perform(params: AdoptPetUsecase.Params): Promise<AdoptPetUsecase.Result> {
    const pet = await this.petRepository.get({ id: params.id })
    if (!pet) throw new BadRequestError('Pet not found')

    const user = await this.userRepository.get({ id: params.userId })
    if (!user) throw new BadRequestError('User not found')

    return this.petRepository.update({
      id: params.id,
      userId: params.userId,
      isAvailable: false,
    })
  }
}
