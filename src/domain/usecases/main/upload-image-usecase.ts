export namespace UploadImageUsecase {
  export const name = 'UploadImageUsecase'

  export type Params = {
    image: Express.Multer.File
  }

  export type Result = {
    imgUrl: string
  }
}

export interface UploadImageUsecase {
  perform: (data: UploadImageUsecase.Params) => Promise<UploadImageUsecase.Result>
}
