
'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar(){
  const [user, setUser] = useState(null)

  useEffect(()=> {
    fetch('/api/auth/me').then(r=> r.ok ? r.json() : Promise.reject()).then(d=> setUser(d.user)).catch(()=> setUser(null))
  },[])

  return (
    <nav className="nav">
      <div className="logo">IranMTA</div>
      <ul className="menu">
        <li><Link href='/'><a>صفحه اصلی</a></Link></li>
        <li><Link href='/servers'><a>سرورها</a></Link></li>
        <li><Link href='/gallery'><a>گالری</a></Link></li>
        {user ? (
          <>
            <li><Link href='/profile'><a>پنل</a></Link></li>
            <li><a href="#" onClick={async()=> { await fetch('/api/auth/logout',{method:'POST'}); location.href='/' }}>خروج</a></li>
          </>
        ) : (
          <>
            <li><Link href='/auth/login'><a>ورود</a></Link></li>
            <li><Link href='/auth/register'><a>ثبت‌نام</a></Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}
