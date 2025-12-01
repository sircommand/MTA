
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password, name })
    })
    if (res.ok) {
      router.push('/auth/login')
    } else {
      const data = await res.json()
      setError(data.message || 'خطا در ثبت‌نام')
    }
  }

  return (
    <section>
      <h1>ثبت‌نام</h1>
      <form onSubmit={submit} className="auth">
        <label>نام<input value={name} onChange={e=>setName(e.target.value)} /></label>
        <label>ایمیل<input value={email} onChange={e=>setEmail(e.target.value)} type="email" /></label>
        <label>رمز عبور<input value={password} onChange={e=>setPassword(e.target.value)} type="password" /></label>
        <button className="btn" type="submit">ثبت‌نام</button>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  )
}
