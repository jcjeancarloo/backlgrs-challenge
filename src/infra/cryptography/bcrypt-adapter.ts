import { type Hasher } from '@/app/protocols/cryptography'
import bcrypt from 'bcrypt'
import { inject, injectable } from 'tsyringe'

@injectable()
export class BcryptAdapter implements Hasher {
  constructor(@inject('salt') private readonly salt: number) {
    this.salt = salt
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
