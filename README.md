# 🪔 Parampara — Family Heritage Platform

> *Your family's traditions, preserved forever.*

A culturally rich, AI-powered platform for Indian and South Asian families to document, preserve, and pass down rituals, ceremonies, and traditions across generations.

---

## 🚀 Deploy to Vercel (Share with Friends)

### One-click deploy:

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Add environment variable: `ANTHROPIC_API_KEY` = your key
5. Click Deploy → get your shareable URL in ~60 seconds!

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# Run dev server
npm run dev
# Open http://localhost:3000
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ Yes | From [console.anthropic.com](https://console.anthropic.com) |
| `NEXT_PUBLIC_SUPABASE_URL` | Phase 2 | For real auth + database |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Phase 2 | For real auth + database |

---

## 📦 Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | **Next.js 14 App Router** | SSR for SEO, fast edge rendering, file-based routing |
| Styling | **Tailwind CSS** | Utility-first, zero runtime CSS |
| UI Components | **Radix UI + Lucide** | Accessible, unstyled primitives |
| AI | **Anthropic Claude** (claude-sonnet-4-20250514) | Best-in-class cultural understanding |
| Database | **Supabase** (Phase 2) | Postgres + Auth + Realtime + RLS |
| File Storage | **Cloudflare R2** (Phase 2) | Fast, cheap object storage |
| Deployment | **Vercel** | Edge network, zero config |
| Fonts | **Playfair Display + Inter** | Elegant serif + clean sans |

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page (SEO-optimized)
│   ├── dashboard/            # Family dashboard
│   ├── rituals/              # Ritual vault + detail + new
│   ├── festivals/            # Festival calendar
│   ├── ai/                   # AI assistant (3 features)
│   ├── media/                # Memory vault
│   ├── members/              # Family members
│   ├── auth/                 # Login + signup
│   └── api/ai/               # Claude API routes
├── components/
│   └── layout/AppShell.tsx   # Main app shell with nav
└── lib/
    ├── data.ts               # Demo seed data
    └── utils.ts              # Utilities + constants
```

---

## ✅ MVP Features (All Functional)

- [x] **Module 1**: Auth (demo) + Family Space + Member Roles
- [x] **Module 2**: Ritual Vault — steps, samagri, mantras, elder notes
- [x] **Module 3**: Festival Calendar — 6 festivals with countdown, reminders
- [x] **Module 4**: AI Assistant — Explainer, Samagri Generator, Gap Finder
- [x] **Module 5**: Memory Vault — photo/video/audio grid, reactions, voice recorder
- [x] SEO metadata + Open Graph on all pages
- [x] PWA manifest for add-to-homescreen
- [x] Mobile responsive design
- [x] Static generation for ritual pages (ultra-fast)

---

## 🗺 Phase 2 Roadmap

- [ ] Real Supabase auth + database
- [ ] Cloudflare R2 media uploads
- [ ] Family tree visualization
- [ ] PDF legacy book export
- [ ] Multi-language UI (Hindi, Tamil, Punjabi)
- [ ] Subscriptions / paid tiers

---

*परंपरा — tradition, heritage, legacy*
