import { Upload } from '@/app/protocols/image/methods'
import { UploadImageUsecase } from '@/domain/usecases'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UploadImageService implements UploadImageUsecase {
  constructor(
    @inject('ImageManager')
    private readonly uploadImage: Upload,
  ) {}
  async perform({ image }: UploadImageUsecase.Params): Promise<UploadImageUsecase.Result> {
    const { link } = await this.uploadImage.upload({ image })
    return {
      imgUrl: link,
    }
  }
}
