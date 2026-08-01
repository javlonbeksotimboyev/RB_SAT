import Link from 'next/link'
import { useState } from 'react'
import strings from '../locales/strings.json'

export default function Header(){
  const [lang, setLang] = useState(typeof window !== 'undefined' ? localStorage.getItem('rb_lang') || 'uz' : 'uz')
  function toggle(){ const n = lang==='uz' ? 'en' : 'uz'; setLang(n); localStorage.setItem('rb_lang', n); window.location.reload() }
  const s = strings[lang]
  return (
    <header style={{padding:'12px 20px',borderBottom:'1px solid #eee',marginBottom:20}}>
      <div style={{maxWidth:900,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><Link href='/'><a style={{fontWeight:700}}>{s.welcome}</a></Link></div>
        <div>
          <Link href="/signup"><a style={{marginRight:12}}>{s.signup}</a></Link>
          <Link href="/login"><a style={{marginRight:12}}>{s.login}</a></Link>
          <Link href="/dashboard"><a style={{marginRight:12}}>{s.dashboard}</a></Link>
          <Link href="/admin"><a style={{marginRight:12}}>{s.admin}</a></Link>
          <button onClick={toggle}>{lang==='uz' ? 'EN' : 'UZ'}</button>
        </div>
      </div>
    </header>
  )
}
