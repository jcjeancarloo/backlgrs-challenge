import { Hasher, Signer } from '@/app/protocols/cryptography'
import * as UserRepository from '@/app/protocols/db/repositories/users'
import { CreateUserService } from '@/app/services'
import { CreateUserUsecase } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { mock, type MockProxy } from 'jest-mock-extended'

interface UserRepositoryMock extends UserRepository.Create, UserRepository.GetByEmail {}
interface HasherMock extends Hasher {}
interface SignerMock extends Signer {}

let params: CreateUserUsecase.Params

let repoUserRepositoryStub: MockProxy<UserRepositoryMock>
let hasherStub: MockProxy<HasherMock>
let sut: CreateUserService

const mockUser: UserRepository.Create.Result = {
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  updatedAt: faker.date.anytime(),
  createdAt: faker.date.anytime(),
}

describe('Create user service', () => {
  beforeEach(() => {
    params = {
      id: faker.string.uuid(),
      name: 'John Doe',
      avatar: 'img-url',
      email: 'test@test.com',
      password: '123456',
      updatedAt: faker.date.anytime(),
      createdAt: faker.date.anytime(),
    }

    repoUserRepositoryStub = mock<UserRepositoryMock>()
    repoUserRepositoryStub.getByEmail.mockResolvedValue(null)
    repoUserRepositoryStub.create.mockResolvedValue(mockUser)

    hasherStub = mock<HasherMock>()
    hasherStub.hash.mockResolvedValue('hashed-pass')

    sut = new CreateUserService(repoUserRepositoryStub, hasherStub)
  })

  it('should create user successfully', async () => {
    const result = await sut.perform(params)

    expect(result).toEqual({ ...mockUser })

    expect(repoUserRepositoryStub.create).toHaveBeenCalledWith({
      ...params,
      password: 'hashed-pass',
    })
    expect(hasherStub.hash).toHaveBeenCalledWith(params.password)

    expect(repoUserRepositoryStub.create).toHaveBeenCalledTimes(1)
    expect(hasherStub.hash).toHaveBeenCalledTimes(1)
  })

  it('should throw error if user already exists', async () => {
    repoUserRepositoryStub.getByEmail.mockResolvedValue({ ...mockUser, password: params.password })
    await expect(sut.perform(params)).rejects.toThrow('User already exists')
  })
})
