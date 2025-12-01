
'use client'
import { useEffect, useState } from 'react'

export default function Servers() {
  const [servers, setServers] = useState([])
  const [search, setSearch] = useState('')
  const [mode, setMode] = useState('')
  const [sort, setSort] = useState('')
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    if (mode) params.append('mode', mode)
    if (sort) params.append('sort', sort)
    const res = await fetch('/api/servers?' + params.toString())
    const data = await res.json()
    setServers(data.servers || [])
    setLoading(false)
  }

  useEffect(()=> { load() }, [])

  return (
    <section>
      <h1>لیست سرورها</h1>
      <div className="filters">
        <input placeholder="جستجو..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select value={mode} onChange={e=>setMode(e.target.value)}>
          <option value="">همه مودها</option>
          <option value="RP">RP</option>
          <option value="Race">Race</option>
          <option value="Drift">Drift</option>
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="">مرتب‌سازی</option>
          <option value="players_desc">بیشترین پلیر</option>
          <option value="players_asc">کمترین پلیر</option>
          <option value="newest">جدیدترین</option>
        </select>
        <button className="btn" onClick={load}>اعمال</button>
      </div>

      {loading ? <p>در حال بارگذاری...</p> : (
        <div className="grid">
          {servers.map(s=>(
            <div className="card server" key={s.id}>
              <h3>{s.name}</h3>
              <p>IP: {s.ip}</p>
              <p>Players: {s.players}</p>
              <p>Mode: {s.mode}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
