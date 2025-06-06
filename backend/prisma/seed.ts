import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const prisma = new PrismaClient()

async function adminSeed() {
  return await prisma.user.create({
    data: {
      fullname: 'Admin Bank Soal',
      email: 'gabrielsidomulyo234@gmail.com',
      password: '$2b$10$L6ZdHyMrmQFmKNM1UBxEQ.ELfsGNvKU0djwvcKDfnIazvlDbw6rE2',
      role: 'ADMIN',
      is_email_verified: true,
      token: '8967'
    }
  })
}

async function main() {
  adminSeed()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// run this command: npx tsx prisma/seed.ts
