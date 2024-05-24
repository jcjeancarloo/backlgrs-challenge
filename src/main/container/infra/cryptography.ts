import { Hasher } from '@/app/protocols/cryptography'
import { HASHER_SALT } from '@/constants'
import { BcryptAdapter } from '@/infra/cryptography'

import { container } from 'tsyringe'

container.register<Hasher>('Hasher', BcryptAdapter)

container.register('salt', { useValue: HASHER_SALT })

export default container
