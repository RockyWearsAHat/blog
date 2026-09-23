# R7 optimized GLTF pass

## Why
The lightweight R6 scene looked fake. The GLTF car had the right visual direction, but the original asset was too heavy and the staging was broken.

## What changed
- Started from the R5 GLTF version, not the lightweight placeholder version.
- Generated optimized GLB files:
  - `public/models/mclaren_opt_balanced.glb` ~4.1 MB
  - `public/models/tunnel_opt.glb` ~0.02 MB
- Removed the original huge model folders from runtime.
- Public model payload dropped from roughly 70 MB to roughly 4.15 MB.
- Updated `CinematicCanvas.jsx` to load the optimized GLBs.
- Kept fake HUD/speedometer removed.
- Kept the neon wallpaper / video-motion direction.

## Notes
This optimization uses vertex clustering because Blender/gltfpack/gltf-transform were not available in the sandbox. It is intentionally conservative enough to keep the silhouette and major form readable while avoiding the massive original asset payload.
