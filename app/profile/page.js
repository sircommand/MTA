
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(()=> {
    fetch('/api/auth/me')
      .then(r=> r.ok ? r.json() : Promise.reject())
      .then(d=> setUser(d.user))
      .catch(()=> router.push('/auth/login'))
  },[])

  if (!user) return <p>در حال بارگذاری...</p>

  return (
    <section>
      <h1>پنل کاربری</h1>
      <div className="card">
        <p>نام: {user.name || '—'}</p>
        <p>ایمیل: {user.email}</p>
        <p>نقش: {user.role}</p>
      </div>
    </section>
  )
}
