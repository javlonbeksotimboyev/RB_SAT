#!/usr/bin/env node
// scripts/generate_questions.js
// Generates 30 Math + 30 English questions per grade (5-11) and writes data/questions.json
// Grades 5-7: English questions include Uzbek Latin translations (text_uz)

const fs = require('fs')

function makeMathQuestion(id, grade, i){
  // Simple templates by grade
  const idx = String(i+1).padStart(2,'0')
  let text = ''
  let topics = []
  if(grade <= 5){
    // arithmetic / fractions
    const a = 5 + ((i*3)%20)
    const b = 2 + ((i*5)%10)
    text = `Compute: ${a} × ${b} = ?`
    topics = ['arithmetic']
  } else if(grade === 6){
    const a = 10 + ((i*7)%40)
    const b = 1 + ((i*4)%9)
    text = `What is ${a} ÷ ${b}? (integer division if exact)`
    topics = ['division','number-sense']
  } else if(grade === 7){
    const a = 2 + ((i*3)%12)
    const b = 1 + ((i*5)%10)
    text = `Solve for x: ${a}x + ${b} = ${a*b + 10}`
    topics = ['algebra']
  } else if(grade === 8){
    text = `If 3(x - 2) = 2x + 5, what is x?`
    topics = ['algebra']
  } else if(grade === 9){
    text = `A function f(x)=2x^2 - 3x + 1. What is f(3)?`
    topics = ['quadratics']
  } else if(grade === 10){
    text = `Triangle ABC has sides 13, 14, and 15. What is its area? (Use Heron's formula)`
    topics = ['geometry']
  } else { // 11
    text = `If log_2(x) + log_2(x-2) = 3, what is x?`
    topics = ['algebra','logarithms']
  }

  // simple 4 options, correct answer index 2 by default (generator won't ensure correctness for complex items)
  const options = ['A','B','C','D']
  return { id: `m${grade}_${idx}`, section: 'math', grade_min: grade, grade_max: grade, text, options, answer: 2, topics }
}

function makeEnglishQuestion(id, grade, i){
  const idx = String(i+1).padStart(2,'0')
  let text = ''
  let text_uz = undefined
  let topics = []
  if(grade <=7){
    // school-level grammar/vocab
    text = `Choose the correct sentence:`
    const options = ["He go to school.","He goes to school.","He going to school.","He gone to school."]
    text_uz = `To'g'ri gapni tanlang:`
    topics = ['grammar']
    return { id: `e${grade}_${idx}`, section: 'english', grade_min: grade, grade_max: grade, text, text_uz, options, answer: 1, topics }
  } else {
    // SAT-style short question templates
    text = `Read the sentence and choose the best answer to improve it.`
    const options = ["No change","Choice A","Choice B","Choice C"]
    topics = ['grammar','reading-comprehension']
    return { id: `e${grade}_${idx}`, section: 'english', grade_min: grade, grade_max: grade, text, options, answer: 0, topics }
  }
}

const grades = [5,6,7,8,9,10,11]
let questions = []
for(const g of grades){
  for(let i=0;i<30;i++){
    questions.push(makeMathQuestion(null,g,i))
  }
  for(let i=0;i<30;i++){
    questions.push(makeEnglishQuestion(null,g,i))
  }
}

fs.writeFileSync('data/questions.json', JSON.stringify(questions, null, 2))
console.log('Wrote', questions.length, 'questions to data/questions.json')
