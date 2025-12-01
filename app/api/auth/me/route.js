
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {}
  return Object.fromEntries(cookieHeader.split(';').map(c=>c.trim().split('=')).map(([k,v])=>[k,v]))
}

export async function GET(req) {
  try {
    const cookies = parseCookies(req.headers.get('cookie'))
    const token = cookies.token
    if (!token) return new Response(JSON.stringify({ message: 'unauth' }), { status: 401 })
    const payload = jwt.verify(token, JWT_SECRET)
    const user = await prisma.user.findUnique({ where: { id: payload.userId } })
    if (!user) return new Response(JSON.stringify({ message: 'unauth' }), { status: 401 })
    const safe = { id: user.id, email: user.email, name: user.name, role: user.role }
    return new Response(JSON.stringify({ user: safe }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ message: 'unauth' }), { status: 401 })
  }
}
