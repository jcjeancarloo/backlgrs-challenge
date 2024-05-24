import * as EmailManager from '@/app/protocols/e-mail'
import {
  SMTP_AUTH_PASSWORD,
  SMTP_AUTH_USER,
  SMTP_EMAIL_FROM,
  SMTP_HOST,
  SMTP_PORT,
} from '@/constants'
import nodemailer from 'nodemailer'

import { injectable } from 'tsyringe'

@injectable()
export class NodeMailer implements EmailManager.EmailManager {
  async sendEmail(params: EmailManager.SendEmail.Params): Promise<EmailManager.SendEmail.Result> {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      auth: {
        user: SMTP_AUTH_USER,
        pass: SMTP_AUTH_PASSWORD,
      },
    })

    const options = {
      from: SMTP_EMAIL_FROM,
      ...params,
    }

    await transporter.sendMail(options)
  }
}
