import Link from 'next/link'
import { useEffect, useState } from 'react'
import questions from '../data/questions.json'
import { percentToLevel, gradePercent } from '../utils/score'

export default function Dashboard(){
  const [grade, setGrade] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('user-grade') || '8' : '8')
  return (
    <div style={{maxWidth:900,margin:'40px auto'}}>
      <h1>Dashboard</h1>
      <p>Your grade: <strong>{grade}</strong></p>
      <p>
        <Link href="/test"><a>Start Diagnostic (30 Math + 30 English)</a></Link>
      </p>
      <h3>Recent results (local)</h3>
      <RecentResults />
      <h3>Quick info</h3>
      <p>The diagnostics will map scores to levels: beginner → advanced and save results to Firestore when connected to Firebase.</p>
    </div>
  )
}

function RecentResults(){
  const [r, setR] = useState([])
  useEffect(()=>{
    const data = localStorage.getItem('rb_sat_results')
    if(data) setR(JSON.parse(data))
  },[])
  if(!r.length) return <p>No local results yet.</p>
  return (
    <ul>{r.map((x,i)=><li key={i}>{x.timestamp}: Math {x.mathPct}% ({x.mathLevel}) — Eng {x.engPct}% ({x.engLevel})</li>)}</ul>
  )
}
