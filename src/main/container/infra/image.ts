import { ImageManager } from '@/app/protocols/image'
import { Imgur } from '@/infra/image'
import { container } from 'tsyringe'

container.register<ImageManager>('ImageManager', Imgur)

export default container
