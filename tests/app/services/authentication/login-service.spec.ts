import { Hasher, Signer } from '@/app/protocols/cryptography'
import * as UserRepository from '@/app/protocols/db/repositories/users'
import { LoginService } from '@/app/services'
import { LoginUsecase } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { mock, type MockProxy } from 'jest-mock-extended'

interface UserRepositoryMock extends UserRepository.GetByEmail {}
interface HasherMock extends Hasher {}
interface SignerMock extends Signer {}

let params: LoginUsecase.Params

let repoUserRepositoryStub: MockProxy<UserRepositoryMock>
let hasherStub: MockProxy<HasherMock>
let signerStub: MockProxy<SignerMock>
let sut: LoginService

const mockUser: UserRepository.GetByEmail.Result = {
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  updatedAt: faker.date.anytime(),
  createdAt: faker.date.anytime(),
}

describe('Login service', () => {
  beforeEach(() => {
    params = {
      email: 'teste@teste.com',
      password: '123456',
    }

    repoUserRepositoryStub = mock<UserRepositoryMock>()
    repoUserRepositoryStub.getByEmail.mockResolvedValue(mockUser)

    hasherStub = mock<HasherMock>()
    hasherStub.compare.mockResolvedValue(true)
    signerStub = mock<SignerMock>()
    signerStub.sign.mockResolvedValue('aaaa')

    sut = new LoginService(repoUserRepositoryStub, signerStub, hasherStub)
  })

  it('should login successfully', async () => {
    const result = await sut.perform(params)

    expect(result.id).toEqual(mockUser.id)
    expect(result.avatar).toEqual(mockUser.avatar)
    expect(result.email).toEqual(mockUser.email)
    expect(result.name).toEqual(mockUser.name)
    expect(result.access_token).toEqual('aaaa')

    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledWith({ email: params.email })
    expect(signerStub.sign).toHaveBeenCalledWith(mockUser)
    expect(hasherStub.compare).toHaveBeenCalledWith(params.password, mockUser.password)

    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledTimes(1)
    expect(signerStub.sign).toHaveBeenCalledTimes(1)
    expect(hasherStub.compare).toHaveBeenCalledTimes(1)
  })

  it('should throw error on email or password invalid', async () => {
    repoUserRepositoryStub.getByEmail.mockResolvedValue(null)

    await expect(sut.perform(params)).rejects.toThrow('E-mail or password invalid')
    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledWith(expect.anything())
    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledTimes(1)
  })
})
