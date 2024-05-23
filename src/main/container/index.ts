import { container } from 'tsyringe'
import app from './app'
import presentation from './presentation'

container.register('app', { useValue: app })
container.register('presentation', { useValue: presentation })
