import { CreateUserUsecase } from '@/domain/usecases/users'
import { created } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  body: {
    name: string
    email: string
    avatar: string
    password: string
  }
}

@injectable()
export class CreateUserController implements Controller {
  constructor(@inject('CreateUserUsecase') private readonly createUser: CreateUserUsecase) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        body: yup.object({
          name: yup.string().required(),
          email: yup.string().email().required(),
          avatar: yup.string().required(),
          password: yup.string().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ body }: HttpRequest): Promise<HttpResponse> {
    const user = await this.createUser.perform(body)
    return created(user)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
