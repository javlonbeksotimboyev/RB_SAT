const admin = require('firebase-admin')
const fs = require('fs')

// Usage: node scripts/import_to_firestore.js /path/to/serviceAccount.json
// Or set GOOGLE_APPLICATION_CREDENTIALS env var and run without args

async function main(){
  const svcPath = process.argv[2] || process.env.GOOGLE_APPLICATION_CREDENTIALS
  if(!svcPath){
    console.error('Provide path to service account JSON as first arg or set GOOGLE_APPLICATION_CREDENTIALS env var')
    process.exit(1)
  }
  if(!fs.existsSync(svcPath)){
    console.error('Service account file not found:', svcPath)
    process.exit(1)
  }
  const svc = require(svcPath)
  admin.initializeApp({ credential: admin.credential.cert(svc) })
  const db = admin.firestore()

  const dataPath = 'data/questions.json'
  if(!fs.existsSync(dataPath)){
    console.error('questions.json not found. Run: node scripts/generate_questions.js')
    process.exit(1)
  }
  const raw = fs.readFileSync(dataPath,'utf8')
  const questions = JSON.parse(raw)
  console.log('Importing', questions.length, 'questions...')
  let count = 0
  for(const q of questions){
    try{
      await db.collection('questions').doc(q.id).set(q)
      count++
      if(count % 50 === 0) console.log('Imported', count)
    }catch(err){
      console.error('Failed to import', q.id, err)
    }
  }
  console.log('Done. Imported', count, 'questions')
  process.exit(0)
}

main().catch(err=>{ console.error(err); process.exit(1) })
