## Generator & Import

I added two scripts to help you generate the full question bank and import it into Firestore.

1) Generate the questions (locally)

   npm run generate-questions

This runs `scripts/generate_questions.js` and writes `data/questions.json` with 30 math + 30 english items per grade (grades 5–11).

2) Import into Firestore (server/service account required)

   Export a Firebase service account key from your Firebase project (IAM & Admin) and save the JSON locally.

   Then run:

   node scripts/import_to_firestore.js /path/to/serviceAccount.json

   Or set the environment variable:

   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccount.json"
   node scripts/import_to_firestore.js

This will bulk-write all questions to the `questions` collection in your Firestore.

Note: Do not commit your service account key to the repo. Run the import from a secure machine.
