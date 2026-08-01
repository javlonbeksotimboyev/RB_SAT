import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { initFirebase } from '../lib/firebase'
import { useRouter } from 'next/router'
initFirebase()
export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const router = useRouter()
  async function handle(e){
    e.preventDefault()
    const auth = getAuth()
    try{
      await signInWithEmailAndPassword(auth,email,password)
      router.push('/dashboard')
    }catch(err){ alert(err.message) }
  }
  return (
    <div style={{maxWidth:700,margin:'40px auto'}}>
      <h2>Log in</h2>
      <form onSubmit={handle}>
        <label>Email<br/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><br/>
        <label>Password<br/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><br/>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}
