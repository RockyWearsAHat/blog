export const site = {
  name: 'Waldmann Labs',
  owner: 'Alex Waldmann',
  handle: 'RockyWearsAHat',
  github: 'https://github.com/RockyWearsAHat',
  repo: 'https://github.com/RockyWearsAHat/blog',
  tagline: 'Chrome-coded field notes for people building with AI without losing the plot.',
  description:
    'Waldmann Labs is Alex Waldmann’s cinematic engineering journal: AI field notes, interactive tools, and a black-and-white comic-metal site built as proof of taste.',
  domain: 'https://waldmannlabs.com',
  email: 'hello@waldmannlabs.com',
  // Exact user-provided visual references. Instagram could not be fetched here, so the implementation is grounded in the supplied frames:
  // manga speed-line smashes, Blender viewport chaos, high-contrast white/black ink, pink energy glitches, default-cube explosion rhythm.
  instagramReferences: [
    {
      title: 'Reference 01 · Donut ink-smash',
      url: 'https://www.instagram.com/p/DXZulUMDQfB/',
      treatment: 'white-out viewport, ink outlines, black speed-line rays slicing through a central object',
    },
    {
      title: 'Reference 02 · Pink cube detonation',
      url: 'https://www.instagram.com/p/DXz6tAxOh5a/',
      treatment: 'black grid floor, neon-pink energy fragments, explosive shards and bloom-like streaks',
    },
    {
      title: 'Reference 03 · Default cube tunnel',
      url: 'https://www.instagram.com/reel/DZIY1aBhPgZ/',
      treatment: 'monochrome manga perspective tunnel, cube target, scroll-driven punch-in impact frames',
    },
  ],
}

export const navItems = [
  { label: 'Start', href: '/' },
  { label: 'Field Notes', href: '/writing' },
  { label: 'Reactor', href: '/tools/ai-coding-cost-calculator' },
  { label: 'Manifesto', href: '/about' },
  { label: 'Hire', href: '/hire' },
]
