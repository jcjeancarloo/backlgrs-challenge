import { PrismaClient } from '@prisma/client'

class DatabaseHelper {
  public client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }

  public async connect(): Promise<void> {
    await this.client.$connect()
  }
}

export const dbHelper = new DatabaseHelper()
