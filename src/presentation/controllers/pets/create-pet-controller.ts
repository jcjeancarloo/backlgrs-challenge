import { CreatePetUsecase } from '@/domain/usecases'
import { created } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  body: {
    name: string
    photo: string
    breed: string
    weight: number
    age: number
    sex: 'male' | 'female'
    animal: 'dog' | 'cat'
    description: string
  }
}

@injectable()
export class CreatePetController implements Controller {
  constructor(@inject('CreatePetUsecase') private readonly createPet: CreatePetUsecase) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        body: yup.object({
          name: yup.string().required(),
          photo: yup.string().required(),
          breed: yup.string().required(),
          weight: yup.number().required(),
          age: yup.number().min(1).required(),
          sex: yup.string().oneOf(['male', 'female']).required(),
          animal: yup.string().oneOf(['dog', 'cat']).required(),
          description: yup.string().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ body, locals }: HttpRequest): Promise<HttpResponse> {
    const pet = await this.createPet.perform({ ...body, userId: locals.user.id })
    return created(pet)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
