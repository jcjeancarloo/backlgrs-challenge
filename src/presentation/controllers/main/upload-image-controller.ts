import { UploadImageUsecase } from '@/domain/usecases'
import { ok } from '@/presentation/helpers/http-helper'
import { HttpRequest, type Controller, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UploadImageController implements Controller {
  constructor(@inject('UploadImageUsecase') private readonly uploadImage: UploadImageUsecase) {}

  async handle({ file }: HttpRequest): Promise<HttpResponse> {
    const { imgUrl } = await this.uploadImage.perform({ image: file })
    return ok({ imgUrl })
  }
}
