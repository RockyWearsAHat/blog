# Rocky frame-mapped rebuild

This package replaces the personal-name-heavy / fake-lab direction with **Rocky**.

## What changed

- Brand is now Rocky / @RockyWearsAHat.
- Home page is visual-first. Projects are evidence, not the main personality.
- The R3F intro was rebuilt around the uploaded `video(1).mp4` reference at its actual FPS.
- Admin/login routes are preserved.
- MongoDB + bcryptjs + JWT Netlify function is preserved.
- Local dev API is fixed with `npm run dev:full`; plain `npm run dev` still has a safe localStorage fallback so the UI does not explode when functions are unavailable.
- Removed unnecessary packaged `node_modules`, `.git`, macOS metadata, and previous brand leftovers.

## Video analysis used

Primary reference: `video(1).mp4`

- Actual FPS: 30
- Frames: 387
- Duration: 12.9 seconds
- Every frame was read and logged in `docs/video-frame-stats.csv`.
- A contact sheet is included at `docs/video-contact-sheet.jpg`.
- The implementation maps scroll progress to frame numbers so the scroll sequence has room to breathe instead of rushing.

Phase map used in the R3F scene:

| Frames | Time | Visual language |
|---:|---:|---|
| 000–075 | 0.00–2.50s | Blender viewport, grid axes, default cube/object hold |
| 075–087 | 2.50–2.90s | object disappears into raw grid/dark viewport |
| 088–150 | 2.93–5.00s | white manga overexposure, outlined cube, black wedge marks |
| 150–270 | 5.00–9.00s | radial impact burst, black speed-line tunnel, focal object collapses/rebuilds |
| 270–315 | 9.00–10.50s | collapse/explosion center with debris and wedge pull |
| 315–360 | 10.50–12.00s | cube/grid returns, cleaner hold |
| 360–386 | 12.00–12.90s | final dense impact, white fade |

## Run

```bash
npm install
npm run dev:full
```

Or use Netlify locally:

```bash
netlify dev
```

Plain Vite still works for visual/UI work:

```bash
npm run dev
```

## Env

Copy `.env.example` to `.env` locally and set the same variables in Netlify.

```bash
NO_AUTH=true
MONGODB_URI=mongodb+srv://...
MONGODB_DB=rocky_blog
JWT_SECRET=change-me
ADMIN_SETUP_TOKEN=change-me
```

For production, set `NO_AUTH=false`.
