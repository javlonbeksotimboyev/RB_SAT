### Generate full question bank

This project includes a generator script that produces 30 Math + 30 English questions per grade (grades 5–11) and writes them to `data/questions.json`.

To generate the full bank locally:

1. Install dependencies (Node.js 16+)
   npm install
2. Run the generator
   node scripts/generate_questions.js
3. The file `data/questions.json` will be created (or overwritten) with the generated questions.

After generating, you can import the questions into Firestore using the Admin → "Import questions to Firestore" button (requires Firebase project configured and admin user signed in), or run a server-side import script with service account credentials.

