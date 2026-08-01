import Link from 'next/link'
import { useEffect, useState } from 'react'
import { initFirebase } from '../lib/firebase'

export default function Home(){
  useEffect(()=>{ initFirebase() },[])
  return (
    <div style={{maxWidth:900,margin:'40px auto',padding:'0 20px'}}>
      <h1>RB_SAT — Adaptive Diagnostic</h1>
      <p>Welcome. Sign up and choose your grade to begin diagnostics (Math & English).</p>
      <p>
        <Link href="/signup"><a>Sign up</a></Link> · <Link href="/login"><a>Log in</a></Link> · <Link href="/admin"><a>Admin</a></Link>
      </p>
    </div>
  )
}
