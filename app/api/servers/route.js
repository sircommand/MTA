
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {}
  return Object.fromEntries(cookieHeader.split(';').map(c=>c.trim().split('=')).map(([k,v])=>[k,v]))
}

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const search = url.searchParams.get('search') || ''
    const mode = url.searchParams.get('mode') || ''
    const sort = url.searchParams.get('sort') || ''

    const where = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { ip: { contains: search, mode: 'insensitive' } }
      ]
    }
    if (mode) {
      where.mode = mode
    }

    let orderBy = { createdAt: 'desc' }
    if (sort === 'players_desc') orderBy = { players: 'desc' }
    if (sort === 'players_asc') orderBy = { players: 'asc' }
    if (sort === 'newest') orderBy = { createdAt: 'desc' }

    // Prisma expects an object, but building dynamic 'where' shape in JS must match Prisma shape.
    // We will compose query manually.
    const query = {
      where: {},
      orderBy,
    }
    if (search) {
      query.where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { ip: { contains: search, mode: 'insensitive' } }
      ]
    }
    if (mode) {
      query.where.mode = mode
    }

    const servers = await prisma.server.findMany(query)
    return new Response(JSON.stringify({ servers }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: 'error' }), { status: 500 })
  }
}

export async function POST(req) {
  try {
    // protected route - check token
    const cookies = parseCookies(req.headers.get('cookie'))
    const token = cookies.token
    if (!token) return new Response(JSON.stringify({ message: 'unauth' }), { status: 401 })
    let payload
    try { payload = jwt.verify(token, JWT_SECRET) } catch(e) { return new Response(JSON.stringify({ message: 'unauth' }), { status: 401 }) }
    // allow only admin for create (example)
    const userId = payload.userId
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user || user.role !== 'admin') return new Response(JSON.stringify({ message: 'forbidden' }), { status: 403 })

    const body = await req.json()
    const { name, ip, players = 0, mode } = body
    const server = await prisma.server.create({ data: { name, ip, players: Number(players), mode } })
    return new Response(JSON.stringify({ server }), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: 'error' }), { status: 500 })
  }
}
