import { ListPetsUsecase } from '@/domain/usecases'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  query: {
    breed?: string
    isAvailable?: boolean
    userId?: string
  }
}

@injectable()
export class ListPetsController implements Controller {
  constructor(@inject('ListPetsUsecase') private readonly listPets: ListPetsUsecase) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        query: yup.object({
          breed: yup.string(),
          isAvailable: yup.boolean(),
          userId: yup.string(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ query }: HttpRequest): Promise<HttpResponse> {
    const pets = await this.listPets.perform(query)
    return ok(pets)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
