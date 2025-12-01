
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, password, name } = body
    if (!email || !password) return new Response(JSON.stringify({ message: 'ایمیل و رمز لازم است' }), { status: 400 })
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return new Response(JSON.stringify({ message: 'ایمیل قبلا ثبت شده' }), { status: 400 })
    const hash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({ data: { email, password: hash, name } })
    return new Response(JSON.stringify({ user: { id: user.id, email: user.email } }), { status: 201 })
  } catch (err) {
    return new Response(JSON.stringify({ message: 'خطای سرور' }), { status: 500 })
  }
}
