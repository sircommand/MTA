
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    })
    if (res.ok) {
      router.push('/profile')
    } else {
      const data = await res.json()
      setError(data.message || 'خطا در ورود')
    }
  }

  return (
    <section>
      <h1>ورود</h1>
      <form onSubmit={submit} className="auth">
        <label>ایمیل<input value={email} onChange={e=>setEmail(e.target.value)} type="email" /></label>
        <label>رمز عبور<input value={password} onChange={e=>setPassword(e.target.value)} type="password" /></label>
        <button className="btn" type="submit">ورود</button>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  )
}
