import { Hasher, Signer } from '@/app/protocols/cryptography'
import { HASHER_SALT, JWT_EXPIRE_MS, JWT_SECRET } from '@/constants'
import { BcryptAdapter } from '@/infra/cryptography'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'

import { container } from 'tsyringe'

container.register<Hasher>('Hasher', BcryptAdapter)
container.register<Signer>('Signer', JwtAdapter)

container.register('salt', { useValue: HASHER_SALT })
container.register('secret', {
  useValue: JWT_SECRET,
})
container.register('expiresInSeconds', {
  useValue: JWT_EXPIRE_MS,
})

export default container
