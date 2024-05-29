import * as RecoverPasswordRepository from '@/app/protocols/db/repositories/recover-password'
import * as UserRepository from '@/app/protocols/db/repositories/users'
import { SendEmail } from '@/app/protocols/e-mail'
import { ResetPasswordService } from '@/app/services'
import { ResetPasswordUsecase } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { mock, type MockProxy } from 'jest-mock-extended'

interface UserRepositoryMock extends UserRepository.GetByEmail {}
interface RepoRecoverPasswordMock extends RecoverPasswordRepository.Create {}
interface SendEmailMock extends SendEmail {}

let params: ResetPasswordUsecase.Params

let repoUserRepositoryStub: MockProxy<UserRepositoryMock>
let repoRecoverPasswordRepositoryStub: MockProxy<RepoRecoverPasswordMock>
let sendEmailStub: MockProxy<SendEmailMock>
let sut: ResetPasswordService

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

describe('Reset Password service', () => {
  beforeEach(() => {
    params = {
      email: 'teste@teste.com',
    }

    repoUserRepositoryStub = mock<UserRepositoryMock>()
    repoUserRepositoryStub.getByEmail.mockResolvedValue(mockUser)

    repoRecoverPasswordRepositoryStub = mock<RepoRecoverPasswordMock>()
    repoRecoverPasswordRepositoryStub.create.mockResolvedValue(mockRecoverPassword)

    sendEmailStub = mock<SendEmailMock>()

    sut = new ResetPasswordService(
      repoUserRepositoryStub,
      sendEmailStub,
      repoRecoverPasswordRepositoryStub,
    )
  })

  it('should reset password successfully', async () => {
    await sut.perform(params)

    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledWith({ email: params.email })
    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledTimes(1)
    expect(repoRecoverPasswordRepositoryStub.create).toHaveBeenCalledTimes(1)
    expect(sendEmailStub.sendEmail).toHaveBeenCalledTimes(1)
  })

  it('should throw error on email or password invalid', async () => {
    repoUserRepositoryStub.getByEmail.mockResolvedValue(null)

    await expect(sut.perform(params)).rejects.toThrow('User not found')
    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledWith({ email: params.email })
    expect(repoUserRepositoryStub.getByEmail).toHaveBeenCalledTimes(1)
  })
})
