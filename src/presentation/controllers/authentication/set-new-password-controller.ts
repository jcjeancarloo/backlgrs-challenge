import { SetNewPasswordUsecase } from '@/domain/usecases/authentication'
import { noContent } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  body: {
    email: string
    codeValidation: string
    newPassword: string
  }
}

@injectable()
export class SetNewPasswordController implements Controller {
  constructor(
    @inject('SetNewPasswordUsecase') private readonly setNewPassword: SetNewPasswordUsecase,
  ) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        body: yup.object({
          email: yup.string().required(),
          codeValidation: yup.string().required(),
          newPassword: yup.string().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ body }: HttpRequest): Promise<HttpResponse> {
    await this.setNewPassword.perform(body)
    return noContent()
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
