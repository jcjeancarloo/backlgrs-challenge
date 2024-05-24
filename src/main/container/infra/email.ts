import { EmailManager } from '@/app/protocols/e-mail'
import { NodeMailer } from '@/infra/email'
import { container } from 'tsyringe'

container.register<EmailManager>('EmailManager', {
  useClass: NodeMailer,
})

export default container
