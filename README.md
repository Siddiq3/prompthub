# Photo Prompt Hub

Premium React + Tailwind prompt gallery with masonry layout, sticky glass UI, local saved/copy features, and static policy pages.

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router DOM
- react-icons
- JavaScript (no TypeScript)

## 1) Setup

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

## 2) Configure GitHub RAW JSON URL

Update `src/config.js`:

```js
export const GITHUB_RAW_URL = "PASTE_YOUR_GITHUB_RAW_JSON_URL";
```

### How to create a valid GitHub RAW URL

1. Create a public GitHub repository (or use an existing one).
2. Add your prompt JSON file, for example: `data/prompts.json`.
3. Open the file in GitHub UI.
4. Click **Raw**.
5. Copy the URL from the browser. It will look like:

```txt
https://raw.githubusercontent.com/<username>/<repo>/<branch>/data/prompts.json
```

6. Paste that URL into `src/config.js` as `GITHUB_RAW_URL`.

## 3) Supported JSON Shapes

Both are supported automatically:

```json
[
  {
    "id": "1",
    "title": "..."
  }
]
```

```json
{
  "prompts": [
    {
      "id": "1",
      "title": "..."
    }
  ]
}
```

Required schema fields used by UI:

- `id`
- `title`
- `prompt`
- `negativePrompt`
- `tags`
- `category`
- `model`
- `aspectRatio`
- `createdAt`
- `previewImage`

## 4) Local Features

- Search (title/tags/category/model/prompt text)
- Filters (category/model/aspect ratio)
- Sort (newest/oldest/most copied)
- Copy tracking in `localStorage` (`copyCounts`)
- Saved prompts in `localStorage` (`savedPrompts`)
- WhatsApp floating CTA on all pages

## 5) Deploy to Vercel

1. Push this project to GitHub.
2. Go to [https://vercel.com](https://vercel.com).
3. Import the GitHub repo.
4. Framework preset: **Vite**.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Deploy.

No backend environment variables are required unless you add them later.

## 6) Notes on Images

- If `previewImage` is empty/missing, the UI shows a gradient initials placeholder.
- Replace placeholders with real AI-generated or licensed images for production.
- Ensure you have legal rights to any image you publish.

## 7) Routes

- `/` Home
- `/prompt/:id` Prompt details
- `/about` About
- `/contact` Contact
- `/privacy-policy` Privacy Policy
- `/terms` Terms
- `/disclaimer` Disclaimer
- `/saved` Saved prompts
