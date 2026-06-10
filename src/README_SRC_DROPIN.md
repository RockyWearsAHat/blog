# Waldmann Labs R3F Comic-Metal `src` drop-in

This is a replacement `src` folder for the Vite React repo at `RockyWearsAHat/blog`.

## Requires

You said you already installed the 3D dependencies. This build imports:

```bash
three
@react-three/fiber
@react-three/drei
```

If needed:

```bash
npm install three @react-three/fiber @react-three/drei
```

## Direction implemented

Grounded in the three Instagram references the user sent:

- https://www.instagram.com/p/DXZulUMDQfB/
- https://www.instagram.com/p/DXz6tAxOh5a/
- https://www.instagram.com/reel/DZIY1aBhPgZ/

Instagram was not fetchable from this environment, so the implementation is based on the supplied frames: manga speed-line explosions, high-contrast white/black ink shaders, Blender viewport/default-cube energy, pink neon detonation, scroll-led impact frames.

## Key files

- `src/components/ComicR3FScene.jsx` — Three/R3F scene, ink shader, speed rays, cube/donut/shard sequence.
- `src/styles.css` — black/white comic-metal responsive design.
- `src/pages/Home.jsx` — scroll-staged home page and SEO-readable copy.
- `src/data/site.js` — brand copy and exact Instagram reference URLs.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
