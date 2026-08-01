import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { initFirebase } from '../lib/firebase'
import { useRouter } from 'next/router'

initFirebase()
export default function Signup(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')
  const [grade,setGrade]=useState('5')
  const router = useRouter()

  async function handle(e){
    e.preventDefault()
    const auth = getAuth()
    try{
      const userCred = await createUserWithEmailAndPassword(auth,email,password)
      await updateProfile(userCred.user,{displayName:name})
      // Save grade in localStorage until Firestore is hooked
      localStorage.setItem('user-grade', grade)
      router.push('/dashboard')
    }catch(err){
      alert(err.message)
    }
  }

  return (
    <div style={{maxWidth:700,margin:'40px auto'}}>
      <h2>Sign up</h2>
      <form onSubmit={handle}>
        <label>Name<br/><input value={name} onChange={e=>setName(e.target.value)} required/></label><br/>
        <label>Email<br/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><br/>
        <label>Password<br/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><br/>
        <label>Grade<br/>
          <select value={grade} onChange={e=>setGrade(e.target.value)}>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
          </select>
        </label>
        <br/>
        <button type="submit">Create account</button>
      </form>
    </div>
  )
}
