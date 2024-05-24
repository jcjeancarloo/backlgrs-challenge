import { ListUsersUsecase } from '@/domain/usecases/users'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  query: {}
}

@injectable()
export class ListUserController implements Controller {
  constructor(@inject('ListUsersUsecase') private readonly listUsers: ListUsersUsecase) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        query: yup.object({}),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ query }: HttpRequest): Promise<HttpResponse> {
    const users = await this.listUsers.perform(query)
    return ok(users)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
