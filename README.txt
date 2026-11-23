LESLOY VISUALS — THE LIVING UNIVERSE V3

Upload all files and folders in this ZIP to the root of your GitHub repository, replacing the existing versions. Vercel should redeploy automatically.

HOMEPAGE EXPERIENCE
- The hero is no longer a single flattened poster.
- It uses a live Three.js scene with a procedural ringed planet, floating islands, stone arches, portfolio photo frames, camera geometry, reflective water, sculptural objects and a moving star field.
- Lesley is a separate transparent foreground image layer with independent floating, pointer parallax and scroll movement. The hero title, menu, tagline and CTA are live HTML, not baked into an image.
- Floating photo cards use existing portfolio assets.

TECHNICAL NOTES
- Three.js is loaded from cdnjs (0.160.0). If that CDN is blocked, the CSS atmosphere and HTML foreground layers remain; the real-time 3D scene will not render.
- The person is currently a separate transparent 2D cutout with depth/parallax motion, not a fully rigged 3D character model.
- Reduced-motion preferences disable continuous 3D/ambient animations.
