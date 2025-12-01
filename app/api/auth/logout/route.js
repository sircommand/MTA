
export async function POST() {
  const res = new Response(JSON.stringify({ message: 'logged out' }), { status: 200 })
  res.headers.set('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`)
  return res
}
