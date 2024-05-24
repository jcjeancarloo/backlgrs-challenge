import { PetRepository } from '@/app/protocols/db/repositories/pets'
import {
  AdoptPetService,
  CreatePetService,
  DeletePetService,
  ListPetsService,
  UpdatePetService,
} from '@/app/services/pets'
import {
  AdoptPetUsecase,
  CreatePetUsecase,
  DeletePetUsecase,
  ListPetsUsecase,
  UpdatePetUsecase,
} from '@/domain/usecases'
import { PetPrismaRepository } from '@/infra/db/prisma/repositories'
import { container } from 'tsyringe'

container.register<CreatePetUsecase>('CreatePetUsecase', CreatePetService)
container.register<ListPetsUsecase>('ListPetsUsecase', ListPetsService)
container.register<UpdatePetUsecase>('UpdatePetUsecase', UpdatePetService)
container.register<DeletePetUsecase>('DeletePetUsecase', DeletePetService)
container.register<AdoptPetUsecase>('AdoptPetUsecase', AdoptPetService)

container.register<PetRepository>('PetRepository', PetPrismaRepository)

export default container
