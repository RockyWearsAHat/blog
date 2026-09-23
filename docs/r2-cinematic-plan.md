# Rocky R2 Cinematic Direction

## Problem fixed
The previous hero matched the uploaded reference timing, but it still felt like a cube/grid demo. This pass changes the hero into a scroll-choreographed car scene with a real camera idea and a destination.

## New sequence
1. **Ignition / inside the machine** — road, car, HUD, shader sky, and dark cinematic framing.
2. **Window pan** — camera slides out to the side of the car while instanced trees blur past.
3. **Chase lock** — camera pulls behind the car, speed streaks intensify, and the road/tree tunnel sells motion.
4. **Clockwise roll / descent** — camera rolls clockwise and drops down, matching the user's requested transition.
5. **Content runway** — the 3D scene lands on nav tiles for Writing, Workflow, Builds, and Hire so the visual experience resolves into actual site content.

## Technical approach
- React Three Fiber scene with high-performance instanced meshes for trees, rails, streaks, road markers, and motion ribbons.
- Custom GLSL shader sky with animated horizon, scanline, grid, and pink/cream chromatic atmosphere.
- Scroll-smoothed camera rig using multiple phase spans instead of a single linear move.
- CSS overlays for window reflection, speed lines, HUD, speed gauge, scanlines, and cinematic vignette.
- Homepage content expanded immediately after the hero with Quick Nav and a Content Engine section.

## Intent
The site should now feel more like a WebGPU-era interactive pitch surface, even while staying deployable as a Vite/Netlify React site without adding fragile dependencies.
