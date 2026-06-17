# ReachOut — AI Cold Email & Cover Letter Writer

**ReachOut** generates tailored cold outreach emails and cover letters in seconds, powered by AI. Paste a job posting, describe your background, pick a tone, add your name, and get a sharp, specific draft — not generic filler. It even tries to find the company's public HR email for you.

🚀 **Live Demo:** [https://reachoutai-ten.vercel.app/](https://reachoutai-ten.vercel.app/)

## Why it's useful

- **Saves hours** of drafting and rewriting outreach emails from scratch.
- **Tailored to each role** — the AI uses your actual background, name, and the job description to write something specific.
- **Find HR contacts** — a one-click search attempts to locate the company's public HR/careers email via DuckDuckGo.
- **Personalized Sign-Off** — enter your name and profession to automatically sign off the generated draft.
- **Multiple export options** — copy, download as .txt, or open directly in your email client with everything pre-filled.
- **Free forever** — runs entirely on free tiers (Groq, Vercel, GitHub).

## Tech Stack

- **Next.js 14** — App Router, TypeScript
- **Tailwind CSS v4** — custom design tokens for the letter/postal theme
- **Groq API** — `llama-3.3-70b-versatile` model for fast, high-quality text generation
- **Cheerio** — server-side HTML parsing for the HR email finder
- **Vercel** — deployment on the free Hobby plan

## Local Setup

### 1. Clone and install

```bash
git clone https://github.com/imsky1812/ReachOut.ai.git
cd ReachOut.ai
npm install
```

### 2. Get a free Groq API key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up for a free account (Google/GitHub sign-in works)
3. Navigate to **API Keys** in the left sidebar
4. Click **Create API Key**
5. Copy the generated key

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and paste your Groq API key:

```
GROQ_API_KEY=gsk_your_actual_key_here
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

### 1. Push to GitHub

Create a new public repo on GitHub and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/imsky1812/ReachOut.ai.git
git push -u origin main
```

### 2. Import in Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to your `ReachOut.ai` repository
3. Vercel auto-detects Next.js — leave all settings as default

### 3. Add environment variables

1. Before clicking **Deploy**, expand **Environment Variables**
2. Add: `GROQ_API_KEY` = `gsk_your_actual_key_here`
3. Click **Deploy**

### 4. Done!

Your app will be live at `reachoutai-ten.vercel.app` (or your custom Vercel subdomain).

## Project Structure

```
reachout-ai/
├── app/
│   ├── api/
│   │   ├── generate/route.ts    # LLM-powered email/cover letter generation
│   │   └── find-email/route.ts  # HR email finder via DuckDuckGo scraping
│   ├── globals.css              # Design system + custom styles
│   ├── layout.tsx               # Root layout with fonts and metadata
│   └── page.tsx                 # Main page (form + preview)
├── components/
│   ├── Footer.tsx               # Developer credit + Digital Heroes button
│   ├── GeneratorForm.tsx        # Input form with mode toggle, email finder
│   └── LetterPreview.tsx        # Generated letter preview with actions
├── public/
├── .env.example                 # Environment variable template
├── .gitignore
├── next.config.ts               # Next.js configuration
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## License

MIT
