import { initFirebase } from '../../lib/firebase'
import { useEffect, useState } from 'react'
import questions from '../../data/questions.json'

initFirebase()
export default function Admin(){
  const [q, setQ] = useState(questions.slice(0,10))
  // Simple admin: show count and allow download of question bank
  return (
    <div style={{maxWidth:900,margin:'40px auto'}}>
      <h1>Admin</h1>
      <p>Question bank count: {questions.length}</p>
      <button onClick={()=>{ const blob = new Blob([JSON.stringify(questions,null,2)],{type:'application/json'}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='questions.json'; a.click(); }}>Download questions.json</button>
      <h3>Seed guidance</h3>
      <p>Use this admin page later to add an editor for questions. For now download the JSON and import into Firestore or edit locally.</p>
    </div>
  )
}
