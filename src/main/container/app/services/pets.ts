import { PetRepository } from '@/app/protocols/db/repositories/pets'
import { CreatePetService } from '@/app/services/pets'
import { CreatePetUsecase } from '@/domain/usecases'
import { PetPrismaRepository } from '@/infra/db/prisma/repositories'
import { container } from 'tsyringe'

container.register<CreatePetUsecase>('CreatePetUsecase', CreatePetService)

container.register<PetRepository>('PetRepository', PetPrismaRepository)

export default container
