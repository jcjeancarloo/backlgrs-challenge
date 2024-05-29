import * as PetRepository from '@/app/protocols/db/repositories/pets'
import { CreatePetService } from '@/app/services'
import { CreatePetUsecase } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { mock, type MockProxy } from 'jest-mock-extended'

interface PetRepositoryMock extends PetRepository.Create, PetRepository.Get {}

let params: CreatePetUsecase.Params

let repoPetRepositoryStub: MockProxy<PetRepositoryMock>

let sut: CreatePetService

const mockPet: PetRepository.Get.Result = {
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  breed: faker.string.alpha(),
  isAvailable: true,
  photo: faker.image.avatar(),
  userId: faker.string.uuid(),
  age: faker.number.int(),
  sex: 'male',
  description: faker.string.sample(),
  animal: 'dog',
  weight: faker.number.int(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
}

describe('Create pet service', () => {
  beforeEach(() => {
    params = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      name: 'Rufus',
      photo: 'img-url',
      breed: 'Pitbull',
      isAvailable: true,
      age: 1,
      animal: 'dog',
      sex: 'male',
      description: 'xpto',
      weight: 1,
      updatedAt: faker.date.anytime(),
      createdAt: faker.date.anytime(),
    }

    repoPetRepositoryStub = mock<PetRepositoryMock>()
    repoPetRepositoryStub.get.mockResolvedValue(null)
    repoPetRepositoryStub.create.mockResolvedValue(mockPet)

    sut = new CreatePetService(repoPetRepositoryStub)
  })

  it('should create pet successfully', async () => {
    const result = await sut.perform(params)

    expect(result).toEqual({ ...mockPet })

    expect(repoPetRepositoryStub.create).toHaveBeenCalledWith(params)
    expect(repoPetRepositoryStub.create).toHaveBeenCalledTimes(1)
  })
})
