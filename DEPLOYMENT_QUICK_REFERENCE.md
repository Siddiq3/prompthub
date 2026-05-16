# 🚀 Production Deployment Guide
## PhotoPromptsHub - Quick Reference

### Vercel Deployment Checklist

#### Before Each Deploy
```bash
# 1. Clean build test
rm -rf .next out
npm run build

# Expected output:
# ✓ Compiled successfully
# ✓ Generating static pages (236/236)
# → .next/ directory created (NOT out/)
```

#### Verify Production Configuration
```bash
# Check these files are correct:
✓ next.config.js: NO "output: export"
✓ vercel.json: Minimal or auto-detect only
✓ package.json: No "export" script
✓ .gitignore: Includes .next/, out/, dist/
```

#### Deploy Steps
```bash
# 1. Commit changes
git add .
git commit -m "feat: [description]"

# 2. Push to master branch
git push origin master

# 3. Vercel auto-deploys
# Monitor: https://vercel.com/[your-account]/[project]
```

#### Monitor Deployment
- ✅ Build should complete in 60-90 seconds
- ✅ Framework detected: "Next.js"
- ✅ All pages prerendered: "236 routes"
- ✅ No build errors in logs
- ✅ Production URL works: photopromptshub.in

---

### Key Configuration Files

#### ✅ next.config.js (Correct)
```javascript
const nextConfig = {
  images: {
    domains: ["photopromptshub.in", ...],
  },
  compress: true,
  reactStrictMode: true,
  // NO "output: export"
  // NO "images.unoptimized: true"
};
module.exports = nextConfig;
```

#### ✅ vercel.json (Correct)
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json"
}
```
(Minimal = let Vercel auto-detect)

#### ✅ package.json scripts (Correct)
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

#### ✅ .gitignore (Correct)
```
node_modules/
.next/
out/
dist/
.env.local
```

---

### Build Output

#### ✅ Production (.next/)
```
.next/
├── server/          ← Next.js server
├── static/          ← Client bundles
├── public/          ← Static files
└── standalone/      ← Standalone build
```

#### ❌ Legacy (out/)
```
out/
├── index.html       ← Old React SPA
├── _next/           ← Client only
└── static/          ← Vite artifacts
```

---

### Troubleshooting

#### Issue: Vercel deploys as static site
**Symptom**: Errors on dynamic pages, API routes don't work
```bash
✗ Check: next.config.js has "output: export"
✗ Check: vercel.json has "framework: vite"
→ Fix: Remove output: "export", simplify vercel.json
```

#### Issue: Images not optimizing
**Symptom**: Slow image loads, no webp format
```bash
✗ Check: "images.unoptimized: true" in next.config.js
→ Fix: Remove unoptimized line
```

#### Issue: API routes 404
**Symptom**: /api/prompts returns 404
```bash
✗ Check: output: "export" prevents API routes
✗ Check: Images: { unoptimized: true }
→ Fix: Use server-side rendering config (see above)
```

---

### Environment Variables

#### Production (.env.production)
```
NEXT_PUBLIC_SITE_URL=https://photopromptshub.in
NEXT_PUBLIC_GITHUB_RAW_URL=https://raw.githubusercontent.com/Siddiq3/...
NEXT_PUBLIC_SUPPORT_EMAIL=hello@photopromptshub.in
```

#### Set in Vercel Dashboard
```
Vercel → [Project] → Settings → Environment Variables
Add:
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_GITHUB_RAW_URL
- etc.
```

---

### Performance Checklist

- [ ] Build completes in <120 seconds
- [ ] No console errors in browser
- [ ] No "Error occurred prerendering" messages
- [ ] All 236 routes show in Vercel dashboard
- [ ] /prompt/[slug] routes load with metadata
- [ ] Images display with proper optimization
- [ ] API routes respond correctly (/api/prompts)
- [ ] Search and filters work (/prompts?q=...)

---

### Quick Commands

```bash
# Local development
npm run dev

# Production build test
npm run build && npm run start

# Deploy
git push origin master

# View build logs
npm run build 2>&1 | tail -50

# Check what will deploy
git status
```

---

### Architecture Summary

```
Next.js 14.2.35 (Server-side rendering)
├── /app                    → App Router
│   ├── /prompt/[slug]     → Dynamic routes (prerendered)
│   ├── /api/prompts       → Server API endpoint
│   └── layout.jsx         → Root layout
├── /src/components        → React components
├── /src/lib               → Data fetching
└── /public                → Static assets

Deployment: Vercel (auto-scaling server)
Build: npm run build → .next/
Start: npm run start → localhost:3000
```

---

### Files NOT to Commit

```
.next/              ← Generated on build
out/                ← Old Vite output
dist/               ← Old build output
node_modules/       ← npm install
.DS_Store           ← macOS temp files
.env.local          ← Local secrets
```

---

### Support

**Vercel Status**: https://vercel.com/status  
**Next.js Docs**: https://nextjs.org/docs  
**GitHub Repo**: https://github.com/Siddiq3/prompthub

---

✅ **System ready for production deployment!**
