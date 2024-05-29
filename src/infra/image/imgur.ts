import * as ImageManager from '@/app/protocols/image/image-manager'
import { Upload } from '@/app/protocols/image/methods'
import { IMGUR_CLIENT_ID } from '@/constants'
import { generateUniqueToken } from '@/utils'

import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'
import { injectable } from 'tsyringe'

@injectable()
export class Imgur implements ImageManager.ImageManager {
  async upload({ image }: Upload.Params): Promise<Upload.Result> {
    const imagePath = path.resolve('temp', image.filename)
    const randomToken = generateUniqueToken().toLowerCase()
    const imgName = `pet-adote-${randomToken}`

    const formData = new FormData()
    formData.append('image', fs.createReadStream(imagePath))
    formData.append('type', 'image')
    formData.append('title', imgName)
    formData.append('description', imgName)

    const { data } = await axios.post('https://api.imgur.com/3/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
      },
    })

    fs.unlink(imagePath, (err) => {
      if (err) return err
    })

    return {
      link: data.data.link,
    }
  }
}
