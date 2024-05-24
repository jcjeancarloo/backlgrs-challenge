import { UpdatePetUsecase } from '@/domain/usecases'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  params: {
    id: string
  }
  body: {
    name?: string
    photo?: string
    breed?: string
    userId?: string
    isAvailable?: boolean
  }
}

@injectable()
export class UpdatePetController implements Controller {
  constructor(@inject('UpdatePetUsecase') private readonly updatePet: UpdatePetUsecase) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        params: yup.object({
          id: yup.string().uuid().required(),
        }),
        body: yup.object({
          name: yup.string(),
          photo: yup.string(),
          breed: yup.string(),
          userId: yup.string(),
          isAvailable: yup.boolean(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ params, body }: HttpRequest): Promise<HttpResponse> {
    const pet = await this.updatePet.perform({ ...params, ...body })
    return ok(pet)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
