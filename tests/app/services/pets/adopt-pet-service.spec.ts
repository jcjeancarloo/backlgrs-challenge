import * as PetRepository from '@/app/protocols/db/repositories/pets'
import * as UserRepository from '@/app/protocols/db/repositories/users'

import { AdoptPetService } from '@/app/services'
import { AdoptPetUsecase } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { mock, type MockProxy } from 'jest-mock-extended'

interface PetRepositoryMock extends PetRepository.Get, PetRepository.Update {}
interface UserRepositoryMock extends UserRepository.Get {}

let params: AdoptPetUsecase.Params

let repoPetRepositoryStub: MockProxy<PetRepositoryMock>
let repoUserRepositoryStub: MockProxy<UserRepositoryMock>

let sut: AdoptPetService

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

const mockUser: UserRepository.GetByEmail.Result = {
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  updatedAt: faker.date.anytime(),
  createdAt: faker.date.anytime(),
}

const newOwner = faker.string.uuid()

describe('Adopt pet service', () => {
  beforeEach(() => {
    params = {
      id: faker.string.uuid(),
      userId: newOwner,
    }

    repoUserRepositoryStub = mock<UserRepositoryMock>()
    repoUserRepositoryStub.get.mockResolvedValue(mockUser)

    repoPetRepositoryStub = mock<PetRepositoryMock>()
    repoPetRepositoryStub.get.mockResolvedValue(mockPet)
    repoPetRepositoryStub.update.mockResolvedValue({
      ...mockPet,
      isAvailable: false,
      userId: newOwner,
    })

    sut = new AdoptPetService(repoPetRepositoryStub, repoUserRepositoryStub)
  })

  it('should adopt pet successfully', async () => {
    const result = await sut.perform(params)

    expect(result).toEqual({ ...mockPet, isAvailable: false, userId: params.userId })

    expect(repoUserRepositoryStub.get).toHaveBeenCalledWith({ id: params.userId })
    expect(repoUserRepositoryStub.get).toHaveBeenCalledTimes(1)

    expect(repoPetRepositoryStub.get).toHaveBeenCalledWith({ id: params.id })
    expect(repoPetRepositoryStub.get).toHaveBeenCalledTimes(1)

    expect(repoPetRepositoryStub.update).toHaveBeenCalledWith({
      id: params.id,
      isAvailable: false,
      userId: params.userId,
    })
    expect(repoPetRepositoryStub.update).toHaveBeenCalledTimes(1)
  })

  it('should throw error if pet not found', async () => {
    repoPetRepositoryStub.get.mockResolvedValue(null)

    await expect(sut.perform(params)).rejects.toThrow('Pet not found')
    expect(repoPetRepositoryStub.get).toHaveBeenCalledWith({ id: params.id })
    expect(repoPetRepositoryStub.get).toHaveBeenCalledTimes(1)
  })

  it('should throw error if user not found', async () => {
    repoUserRepositoryStub.get.mockResolvedValue(null)

    await expect(sut.perform(params)).rejects.toThrow('User not found')
    expect(repoUserRepositoryStub.get).toHaveBeenCalledWith({ id: params.userId })
    expect(repoUserRepositoryStub.get).toHaveBeenCalledTimes(1)
  })
})
