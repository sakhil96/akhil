# Akhil Adapala — portfolio

Public-safe personal site. Next.js App Router, TypeScript, Tailwind CSS, Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content

All editable copy lives in `src/src/lib/site.ts`:

- profile (name, role, Bengaluru location, links)
- hero, experience, skills, AWS focus
- hackathons and projects (problem / build / result)
- case studies

Ask-me-anything lives in the global command palette (`⌘K`), backed by `/api/chat`.

## Deploy (Vercel)

1. Push the repo to GitHub.
2. Import it in Vercel.
3. Deploy.

## Notes

- Public-safe copy only (no confidential details).
- `⌘K` answers questions from the public knowledge base, with a local fallback if the live model is down.
