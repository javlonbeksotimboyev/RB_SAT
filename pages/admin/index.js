import { initFirebase, getDB, getClientAuth } from '../../lib/firebase'
import { useEffect, useState } from 'react'
import questions from '../../data/questions.json'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'

initFirebase()
export default function Admin(){
  const [questionCount, setQuestionCount] = useState(questions.length)
  const [students, setStudents] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    // nothing on mount yet
  },[])

  async function importQuestions(){
    setLoading(true)
    const db = getDB()
    const auth = getClientAuth()
    if(!db){ alert('Firestore not configured in .env.local'); setLoading(false); return }
    if(!auth || !auth.currentUser){ alert('Log in as an admin user to import questions'); setLoading(false); return }

    try{
      // write each question as doc with id
      for(const q of questions){
        await setDoc(doc(db,'questions', q.id), q)
      }
      alert('Imported questions into Firestore')
    }catch(err){ console.error(err); alert('Failed to import: '+err.message) }
    setLoading(false)
  }

  async function loadStudentsAndResults(){
    setLoading(true)
    try{
      const db = getDB()
      if(!db){ alert('Firestore not configured'); setLoading(false); return }
      const usersSnap = await getDocs(collection(db,'users'))
      const users = usersSnap.docs.map(d=>({id:d.id, ...d.data()}))
      setStudents(users)
      const resSnap = await getDocs(collection(db,'results'))
      const rs = resSnap.docs.map(d=>({id:d.id, ...d.data()}))
      setResults(rs)
    }catch(err){ console.error(err); alert('Failed to load: '+err.message) }
    setLoading(false)
  }

  function exportCSV(){
    if(!results.length){ alert('No results to export') ; return }
    const headers = ['uid','name','email','grade','mathPct','engPct','mathLevel','engLevel','timestamp']
    const rows = results.map(r => [r.uid, r.name, r.email, r.grade, r.mathPct, r.engPct, r.mathLevel, r.engLevel, r.createdAt].join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], {type:'text/csv'}), url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download='results.csv'; a.click()
  }

  return (
    <div style={{maxWidth:900,margin:'40px auto'}}>
      <h1>Admin Dashboard</h1>
      <p>Question bank count (local): {questionCount}</p>
      <button onClick={importQuestions} disabled={loading}>{loading ? 'Working...' : 'Import questions to Firestore'}</button>
      <button onClick={loadStudentsAndResults} style={{marginLeft:12}}>Load students & results</button>
      <button onClick={exportCSV} style={{marginLeft:12}}>Export results CSV</button>

      <h3>Students ({students.length})</h3>
      <ul>{students.map(s=>(<li key={s.id}>{s.name} — {s.email} — Grade {s.grade} — Admin: {s.isAdmin ? 'yes':'no'}</li>))}</ul>

      <h3>Recent results ({results.length})</h3>
      <ul>{results.slice(0,30).map(r=>(<li key={r.id}>{r.createdAt}: {r.name} ({r.email}) — G{r.grade} — M {r.mathPct}% ({r.mathLevel}) E {r.engPct}% ({r.engLevel})</li>))}</ul>
    </div>
  )
}
