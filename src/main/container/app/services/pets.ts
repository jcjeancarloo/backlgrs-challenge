import { PetRepository } from '@/app/protocols/db/repositories/pets'
import { CreatePetService, ListPetsService, UpdatePetService } from '@/app/services/pets'
import { CreatePetUsecase, ListPetsUsecase, UpdatePetUsecase } from '@/domain/usecases'
import { PetPrismaRepository } from '@/infra/db/prisma/repositories'
import { container } from 'tsyringe'

container.register<CreatePetUsecase>('CreatePetUsecase', CreatePetService)
container.register<ListPetsUsecase>('ListPetsUsecase', ListPetsService)
container.register<UpdatePetUsecase>('UpdatePetUsecase', UpdatePetService)

container.register<PetRepository>('PetRepository', PetPrismaRepository)

export default container
