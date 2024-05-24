export namespace SendEmail {
  export type Params = {
    to: string
    subject: string
    context?: Record<string, unknown>
    text?: string
  }

  export type Result = Promise<void>
}

export interface SendEmail {
  sendEmail: (data: SendEmail.Params) => Promise<SendEmail.Result>
}
