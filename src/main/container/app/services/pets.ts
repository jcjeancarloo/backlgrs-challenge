import { PetRepository } from '@/app/protocols/db/repositories/pets'
import { CreatePetService, ListPetsService } from '@/app/services/pets'
import { CreatePetUsecase, ListPetsUsecase } from '@/domain/usecases'
import { PetPrismaRepository } from '@/infra/db/prisma/repositories'
import { container } from 'tsyringe'

container.register<CreatePetUsecase>('CreatePetUsecase', CreatePetService)
container.register<ListPetsUsecase>('ListPetsUsecase', ListPetsService)

container.register<PetRepository>('PetRepository', PetPrismaRepository)

export default container
