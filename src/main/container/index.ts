import { container } from 'tsyringe'
import app from './app'
import infra from './infra'
import presentation from './presentation'

container.register('app', { useValue: app })
container.register('presentation', { useValue: presentation })
container.register('infra', { useValue: infra })
