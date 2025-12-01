
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

export async function POST(req) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return new Response(JSON.stringify({ message: 'ایمیل و رمز لازم است' }), { status: 400 })
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return new Response(JSON.stringify({ message: 'کاربر یافت نشد' }), { status: 401 })
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return new Response(JSON.stringify({ message: 'رمز نادرست' }), { status: 401 })
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    const res = new Response(JSON.stringify({ message: 'ok' }), { status: 200 })
    res.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${7*24*60*60}; SameSite=Lax`)
    return res
  } catch (err) {
    return new Response(JSON.stringify({ message: 'خطا' }), { status: 500 })
  }
}
