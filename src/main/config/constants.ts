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
