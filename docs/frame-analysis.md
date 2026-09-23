# Frame analysis summary

Primary reference: `video(1).mp4`

- Actual FPS: 30
- Frame count: 387
- Duration: 12.9 seconds
- Every frame was decoded and measured. See `video-frame-stats.csv` / `video-frame-stats.json`.
- Key frame contact sheet: `video-contact-sheet.jpg`.

## Implementation timing map

The R3F scene uses `frame / 386` progress mapping so scroll phases line up with the 30fps reference instead of a generic 10fps/sample approximation.

| Frames | Time | Used in scene |
|---:|---:|---|
| 000–075 | 0.00–2.50s | Blender viewport hold: grid, axes, default focal cube/object |
| 075–087 | 2.50–2.90s | object vanishes into empty raw grid |
| 088–150 | 2.93–5.00s | white overexposure, manga linework, cube returns as outlined object |
| 150–270 | 5.00–9.00s | radial black speed-line impact tunnel, center object collapse/rebuild |
| 270–315 | 9.00–10.50s | strongest collapse/explosion, wedge pull, debris field |
| 315–360 | 10.50–12.00s | reset/hold, cube/grid returns cleaner |
| 360–386 | 12.00–12.90s | final dense impact burst and white fade |
