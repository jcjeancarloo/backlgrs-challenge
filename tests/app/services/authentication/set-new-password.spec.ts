import { Hasher } from '@/app/protocols/cryptography'
import * as RecoverPasswordRepository from '@/app/protocols/db/repositories/recover-password'
import * as UserRepository from '@/app/protocols/db/repositories/users'
import { SetNewPasswordService } from '@/app/services'
import { SetNewPasswordUsecase } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { mock, type MockProxy } from 'jest-mock-extended'

interface UserRepositoryMock extends UserRepository.GetByEmail, UserRepository.Update {}
interface RepoRecoverPasswordMock
  extends RecoverPasswordRepository.Get,
    RecoverPasswordRepository.Delete {}
interface HasherMock extends Hasher {}

let params: SetNewPasswordUsecase.Params

let repoUserRepositoryStub: MockProxy<UserRepositoryMock>
let repoRecoverPasswordRepositoryStub: MockProxy<RepoRecoverPasswordMock>
let hasherStub: MockProxy<HasherMock>

let sut: SetNewPasswordService

const mockUser: UserRepository.GetByEmail.Result = {
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  updatedAt: faker.date.anytime(),
  createdAt: faker.date.anytime(),
}

const mockRecoverPassword: RecoverPasswordRepository.Create.Result = {
  id: faker.string.uuid(),
  codeValidation: faker.string.sample({ min: 1, max: 10 }),
  userId: faker.string.uuid(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
}

describe('Set new password service', () => {
  beforeEach(() => {
    params = {
      email: 'teste@teste.com',
      codeValidation: 'ABCDEF',
      newPassword: '1234',
    }

    repoUserRepositoryStub = mock<UserRepositoryMock>()
    repoUserRepositoryStub.getByEmail.mockResolvedValue(mockUser)

    repoRecoverPasswordRepositoryStub = mock<RepoRecoverPasswordMock>()
    repoRecoverPasswordRepositoryStub.get.mockResolvedValue(mockRecoverPassword)
    repoRecoverPasswordRepositoryStub.delete.mockResolvedValue()

    hasherStub = mock<HasherMock>()
    hasherStub.hash.mockResolvedValue('hashed-pass')

    sut = new SetNewPasswordService(
      repoUserRepositoryStub,
      repoRecoverPasswordRepositoryStub,
      hasherStub,
    )
  })

  it('should set new password successfully', async () => {
    await sut.perform(params)

    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledWith({ email: params.email })
    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledTimes(1)

    expect(repoRecoverPasswordRepositoryStub.get).toHaveBeenCalledWith({
      userId: mockUser.id,
      codeValidation: params.codeValidation,
    })
    expect(repoRecoverPasswordRepositoryStub.get).toHaveBeenCalledTimes(1)
    expect(repoRecoverPasswordRepositoryStub.delete).toHaveBeenCalledTimes(1)

    expect(hasherStub.hash).toHaveBeenCalledWith(params.newPassword)
    expect(hasherStub.hash).toHaveBeenCalledTimes(1)
  })

  it('should throw an error if code validation not match', async () => {
    repoRecoverPasswordRepositoryStub.get.mockResolvedValue(null)

    await expect(sut.perform(params)).rejects.toThrow('Code validation not match')
    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledWith(expect.anything())
    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledTimes(1)
  })

  it('should throw error if user not found', async () => {
    repoUserRepositoryStub.getByEmail.mockResolvedValue(null)

    await expect(sut.perform(params)).rejects.toThrow('User not found')
    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledWith({ email: params.email })
    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledTimes(1)
  })
})
