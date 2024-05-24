import { AdoptPetUsecase } from '@/domain/usecases'
import { noContent } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  params: {
    id: string
  }
  body: {
    userId: string
  }
}

@injectable()
export class AdoptPetController implements Controller {
  constructor(@inject('AdoptPetUsecase') private readonly adoptPet: AdoptPetUsecase) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        params: yup.object({
          id: yup.string().uuid().required(),
        }),
        body: yup.object({
          userId: yup.string().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ params, body }: HttpRequest): Promise<HttpResponse> {
    await this.adoptPet.perform({ ...params, ...body })
    return noContent()
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
