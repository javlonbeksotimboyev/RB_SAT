# RB_SAT

SAT Adaptive Diagnostic Test

This repository contains a Next.js + Firebase starter for an adaptive diagnostic platform for Uzbek students (grades 5–11). It includes student sign-up, 30-question diagnostics (Math + English), level mapping, and a teacher/admin dashboard.

Overview
- Next.js frontend
- Firebase Auth (email/password) and Firestore for data (env placeholders included)
- Admin UI to manage question bank and view student results

Quick start (development)
1. Clone the repo
2. Copy .env.example to .env.local and fill in your Firebase config
3. Install dependencies: npm install
4. Run dev server: npm run dev

Firebase setup
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication → Email/Password
3. Create a Firestore database (in test mode for initial setup)
4. Add your Firebase config to .env.local

Deployment
- Host on Vercel (recommended) and set environment variables there.

See README for details.
