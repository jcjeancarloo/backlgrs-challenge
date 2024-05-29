export namespace Upload {
  export type Params = {
    image: Express.Multer.File
  }

  export type Result = {
    link: string
  }
}

export interface Upload {
  upload: (data: Upload.Params) => Promise<Upload.Result>
}
