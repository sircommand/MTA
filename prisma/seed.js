
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // create admin user (password: admin123)
  const bcrypt = await import('bcrypt')
  const hash = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: { email: 'admin@local', password: hash, name: 'ادمین', role: 'admin' }
  })
  await prisma.server.createMany({
    data: [
      { name: 'IranMTA Classic', ip: 'play.iranmta.ir', players: 42, mode: 'RP' },
      { name: 'Fast Race', ip: 'race.iranmta.ir', players: 12, mode: 'Race' },
      { name: 'Drift Zone', ip: 'drift.iranmta.ir', players: 8, mode: 'Drift' }
    ]
  })
  console.log('Seed complete')
}

main().catch(e=>{ console.error(e); process.exit(1) }).finally(()=> prisma.$disconnect())
