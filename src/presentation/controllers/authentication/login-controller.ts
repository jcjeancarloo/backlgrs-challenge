import { LoginUsecase } from '@/domain/usecases'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  body: {
    email: string
    password: string
  }
}

@injectable()
export class LoginController implements Controller {
  constructor(@inject('LoginUsecase') private readonly login: LoginUsecase) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        body: yup.object({
          email: yup.string().required(),
          password: yup.string().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ body }: HttpRequest): Promise<HttpResponse> {
    const user = await this.login.perform(body)
    return ok(user)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
