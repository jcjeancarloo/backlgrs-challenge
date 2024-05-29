import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { users } from './users'

const prisma = new PrismaClient()

async function main() {
  for (let user of users) {
    const hashedPass = await bcrypt.hash(user.password, 10)
    const created = await prisma.user.create({
      data: { ...user, password: hashedPass },
    })

    await prisma.pet.create({
      data: {
        age: 1,
        animal: 'dog',
        breed: 'Vira Lata',
        description: 'Dog sample description',
        name: 'Little Dog',
        photo:
          'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FjaG9ycm98ZW58MHx8MHx8fDA%3D',
        sex: 'male',
        weight: 1,
        userId: created.id,
      },
    })
  }
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
