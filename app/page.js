
import Link from 'next/link'
export default function Home() {
  return (
    <section>
      <h1>خوش آمدید به IranMTA-style</h1>
      <p>این نسخه نمونه شامل احراز هویت واقعی (JWT)، پایگاه‌داده SQLite با Prisma و صفحهٔ سرورها با جستجو/فیلتر است.</p>
      <div className="hero">
        <h2>شروع کنید</h2>
        <p><Link href="/servers"><a className="btn">مشاهده سرورها</a></Link></p>
      </div>
    </section>
  )
}
