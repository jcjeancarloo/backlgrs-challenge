import { DeletePetUsecase } from '@/domain/usecases'
import { noContent } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  params: {
    id: string
  }
}

@injectable()
export class DeletePetController implements Controller {
  constructor(@inject('DeletePetUsecase') private readonly deletePet: DeletePetUsecase) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        params: yup.object({
          id: yup.string().uuid().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ params }: HttpRequest): Promise<HttpResponse> {
    await this.deletePet.perform(params)
    return noContent()
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
