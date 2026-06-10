export const site = {
  name: 'Alex Waldmann',
  labName: 'Waldmann Lab',
  tagline: 'Software, AI systems, experiments, and notes from what I am building.',
  description:
    "Alex Waldmann's personal engineering lab: software projects, AI tooling, technical writing, experiments, and build logs.",
  email: import.meta.env.VITE_CONTACT_EMAIL || 'alex@example.com',
  github: import.meta.env.VITE_GITHUB_URL || '#',
  linkedin: import.meta.env.VITE_LINKEDIN_URL || '#',
  support: {
    kofi: import.meta.env.VITE_KOFI_URL || '#',
    coffee: import.meta.env.VITE_BUY_ME_A_COFFEE_URL || '#',
    stripe: import.meta.env.VITE_STRIPE_PAYMENT_LINK || '#'
  }
}

export const navItems = [
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'Lab', href: '/lab' },
  { label: 'Now', href: '/now' },
  { label: 'About', href: '/about' },
  { label: 'Hire Me', href: '/hire' }
]
