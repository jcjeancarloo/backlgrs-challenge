import { ResetPasswordUsecase } from '@/domain/usecases'
import { noContent } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  body: {
    email: string
  }
}

@injectable()
export class ResetPasswordController implements Controller {
  constructor(
    @inject('ResetPasswordUsecase') private readonly resetPassword: ResetPasswordUsecase,
  ) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        body: yup.object({
          email: yup.string().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ body }: HttpRequest): Promise<HttpResponse> {
    await this.resetPassword.perform(body)
    return noContent()
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
