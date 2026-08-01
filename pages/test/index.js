import { useState, useEffect } from 'react'
import questions from '../../data/questions.json'
import { gradePercent, percentToLevel, recommendationsFromWrong } from '../../utils/score'
import { useRouter } from 'next/router'

export default function TestPage(){
  const router = useRouter()
  const [answers,setAnswers] = useState({})
  const [submitted,setSubmitted] = useState(false)
  const grade = typeof window !== 'undefined' ? (localStorage.getItem('user-grade') || '8') : '8'

  // select 30 math and 30 english appropriate for grade
  const mathQs = questions.filter(q=>q.section==='math' && q.grade_min<=parseInt(grade) && q.grade_max>=parseInt(grade)).slice(0,30)
  const engQs = questions.filter(q=>q.section==='english' && q.grade_min<=parseInt(grade) && q.grade_max>=parseInt(grade)).slice(0,30)

  function choose(id,idx){ setAnswers(prev=>({...prev,[id]:idx})) }
  function submit(){ setSubmitted(true)
    const mathCorrect = mathQs.reduce((acc,q)=> acc + ((answers[q.id]===q.answer)?1:0), 0)
    const engCorrect = engQs.reduce((acc,q)=> acc + ((answers[q.id]===q.answer)?1:0), 0)
    const mathPct = gradePercent(mathCorrect, mathQs.length)
    const engPct = gradePercent(engCorrect, engQs.length)
    const mathLevel = percentToLevel(mathPct)
    const engLevel = percentToLevel(engPct)
    const recMath = recommendationsFromWrong(mathQs, answers)
    const recEng = recommendationsFromWrong(engQs, answers)
    const result = { timestamp: new Date().toISOString(), mathCorrect, engCorrect, mathPct, engPct, mathLevel, engLevel, recMath, recEng }
    // save locally for now
    const prev = JSON.parse(localStorage.getItem('rb_sat_results')||'[]')
    prev.unshift(result)
    localStorage.setItem('rb_sat_results', JSON.stringify(prev.slice(0,20)))
    localStorage.setItem('rb_sat_latest', JSON.stringify(result))
  }

  if(!submitted){
    return (
      <div style={{maxWidth:900,margin:'40px auto'}}>
        <h2>Diagnostic — Grade {grade}</h2>
        <h3>Math ({mathQs.length} questions)</h3>
        {mathQs.map((q, i)=>(
          <div key={q.id} style={{marginBottom:12}}>
            <div>{i+1}. {q.text}</div>
            {q.options.map((opt,j)=>(
              <label key={j} style={{display:'block'}}>
                <input type="radio" name={q.id} checked={answers[q.id]===j} onChange={()=>choose(q.id,j)} /> {opt}
              </label>
            ))}
          </div>
        ))}
        <h3>English ({engQs.length} questions)</h3>
        {engQs.map((q,i)=>(
          <div key={q.id} style={{marginBottom:12}}>
            <div>{i+1}. {q.text}</div>
            {q.options.map((opt,j)=>(
              <label key={j} style={{display:'block'}}>
                <input type="radio" name={q.id} checked={answers[q.id]===j} onChange={()=>choose(q.id,j)} /> {opt}
              </label>
            ))}
          </div>
        ))}
        <button onClick={()=>{ setSubmitted(true); submit(); }}>Submit</button>
      </div>
    )
  }

  // if submitted show results from localStorage
  const latest = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('rb_sat_latest')||'null') : null
  if(!latest) return <div>Loading...</div>
  return (
    <div style={{maxWidth:900,margin:'40px auto'}}>
      <h2>Results</h2>
      <p>Math: {latest.mathCorrect}/{mathQs.length} → {latest.mathPct}% → <strong>{latest.mathLevel}</strong></p>
      <p>English: {latest.engCorrect}/{engQs.length} → {latest.engPct}% → <strong>{latest.engLevel}</strong></p>
      <h3>Weak topics</h3>
      <p>Math: {latest.recMath.join(', ') || 'none'}</p>
      <p>English: {latest.recEng.join(', ') || 'none'}</p>
      <h3>SAT 1530+ starter plan</h3>
      <ol>
        <li>Set per-section mini-targets (e.g., Math 760/Evidence-based Reading & Writing 770).</li>
        <li>Daily targeted practice on weak topics listed above.</li>
        <li>Weekly timed full-length practice and review.</li>
      </ol>
    </div>
  )
}
