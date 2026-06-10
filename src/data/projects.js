export const projects = [
  {
    slug: 'ai-coding-cost-calculator',
    title: 'AI Coding Cost Calculator',
    status: 'Live prototype',
    type: 'Interactive tool',
    description:
      'A practical estimator that helps developers understand when their AI coding workflow is becoming expensive, risky, or too agent-driven.',
    stack: ['React', 'Vite', 'Cost modeling', 'UX'],
    links: { demo: '/lab/ai-coding-cost-calculator', github: '#' }
  },
  {
    slug: 'local-model-selector',
    title: 'Local Model Selector',
    status: 'In progress',
    type: 'Developer utility',
    description:
      'A decision helper for choosing local coding models based on machine constraints, task type, and quality expectations.',
    stack: ['React', 'Local AI', 'Decision trees'],
    links: { demo: '/lab', github: '#' }
  },
  {
    slug: 'shader-visual-experiments',
    title: 'Shader Visual Experiments',
    status: 'Exploratory',
    type: 'Creative coding',
    description:
      'Visual experiments around zooming, precision, rendering loops, and interactive mathematical systems.',
    stack: ['WebGL', 'Shaders', 'Math', 'UI'],
    links: { demo: '/lab', github: '#' }
  }
]

export function getProject(slug) {
  return projects.find((project) => project.slug === slug)
}
