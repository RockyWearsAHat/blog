# Rocky Blog

Cinematic Vite/React portfolio + blog for Rocky / @RockyWearsAHat.

## Commands

```bash
npm install
npm run dev:full
npm run build
```

`dev:full` starts a local Netlify-function-style API shim on port 8888 and Vite on port 5173.

## Structure

- `src/components/CinematicCanvas.jsx` — frame-mapped R3F intro based on the uploaded 30fps reference video.
- `src/pages/Home.jsx` — visual-first portfolio surface.
- `src/pages/Writing.jsx` and `src/pages/Post.jsx` — blog browser.
- `src/pages/Workflow.jsx` — operating model.
- `src/pages/Admin.jsx` and `src/pages/Login.jsx` — content admin.
- `netlify/functions/api.js` — MongoDB + bcrypt + JWT API.
- `docs/` — frame analysis artifacts.
