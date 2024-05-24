import { type SendEmail } from './methods'

export namespace EmailManager {
  export const name = 'EmailManager'
}

export interface EmailManager extends SendEmail {}
