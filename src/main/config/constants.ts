import * as dotenv from 'dotenv'

dotenv.config()

const numericHandler = (defaultNumber: number, value?: any): number => {
  const parsed = Number(value)
  if (Number.isNaN(parsed)) return defaultNumber
  return parsed
}

export const PORT: number = numericHandler(3333, process.env.PORT)

export const HASHER_SALT: number = 12

export const JWT_SECRET: string = process.env.JWT_SECRET ?? 'fake-secret'

export const JWT_EXPIRE_MS: number = numericHandler(3600, process.env.JWT_EXPIRE_MS)

// SMTP
export const SMTP_HOST = process.env.SMTP_HOST ?? ''
export const SMTP_PORT = process.env.SMTP_PORT ?? ''
export const SMTP_EMAIL_FROM = process.env.SMTP_EMAIL_FROM ?? ''
export const SMTP_AUTH_USER = process.env.SMTP_AUTH_USER ?? ''
export const SMTP_AUTH_PASSWORD = process.env.SMTP_AUTH_PASSWORD ?? ''
