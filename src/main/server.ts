import 'reflect-metadata'
class Clock {
  private prev: number
  constructor() {
    this.prev = Date.now()
  }

  bench = (): string => {
    const diff = Date.now() - this.prev
    const response = `+${(diff / 1000).toFixed(2)}s`
    this.prev = Date.now()
    return response
  }
}

const server = async (): Promise<void> => {
  const clock = new Clock()
  console.log(clock.bench(), '🟧 Starting...')

  const { dbHelper } = await import('@/infra/db/prisma/database-helper')
  await dbHelper.connect()
  console.log(clock.bench(), '🟧 Database connected')

  await import('@/main/container')
  console.log(clock.bench(), '🟧 DI container loaded')

  const { PORT } = await import('@/constants')
  const { setApp } = await import('./config/app')
  const app = setApp()
  app.listen(PORT, () => {
    console.log(clock.bench(), '🟧 Express started')
    console.log(clock.bench(), `✅️ Server ready! Listening at http://[::]:${PORT}`)
  })
}

server().catch(console.error)
