export const posts = [
  {
    slug: 'hidden-cost-of-ai-coding-tools',
    title: 'The Hidden Cost of AI Coding Tools',
    eyebrow: 'AI & Tooling',
    date: '2026-06-09',
    minutes: 7,
    summary:
      'What happens when AI coding tools become powerful enough to help, but opaque enough to burn money and context without warning.',
    body: [
      'AI coding tools are useful, but they are not magic. They are context machines. The more context they pull, the more expensive and unpredictable they become.',
      'The lesson is not to stop using AI. The lesson is to control the workflow: narrow prompts, small patches, visible diffs, local models when possible, and paid tools reserved for problems that justify the cost.',
      'My rule now: AI can help reason, generate options, and inspect small slices of a system. It does not get unlimited permission to roam the whole codebase without a plan.'
    ],
    takeaways: ['Control context', 'Prefer small patches', 'Use local models for routine work', 'Treat paid agents like cloud infrastructure']
  },
  {
    slug: 'ai-as-a-senior-pair-programmer',
    title: 'Using AI as a Pair Programmer, Not a Replacement Brain',
    eyebrow: 'Engineering Notes',
    date: '2026-06-08',
    minutes: 5,
    summary:
      'A practical mental model for using AI while preserving engineering judgment, architecture ownership, and debugging skill.',
    body: [
      'The best use of AI is not asking it to own the project. The best use is making it a sharp, skeptical assistant that works inside constraints.',
      'I want AI to challenge assumptions, find edge cases, draft small functions, and explain unfamiliar APIs. I do not want it silently changing architecture because a vague prompt gave it too much freedom.',
      'The developer still owns the system. AI can accelerate thinking, but it cannot replace accountability.'
    ],
    takeaways: ['Own the architecture', 'Ask for diagnosis before code', 'Review every diff', 'Keep learning the underlying system']
  },
  {
    slug: 'local-first-ai-coding-workflow',
    title: 'Local-First AI Coding Workflow',
    eyebrow: 'Local AI',
    date: '2026-06-07',
    minutes: 6,
    summary:
      'How I think about moving routine coding help off paid cloud tools and into a predictable local workflow.',
    body: [
      'Local AI is not always better, but it is predictable. It cannot surprise you with a giant bill. That makes it ideal for routine explanation, boilerplate, small refactors, and test generation.',
      'A local-first workflow is simple: use local models for everyday code questions, use manual paid prompts for hard reasoning, and avoid agentic repo-wide edits unless they are truly worth it.',
      'The goal is not to worship local models. The goal is to make the cheap path the default and the expensive path intentional.'
    ],
    takeaways: ['Default to local', 'Escalate intentionally', 'Keep prompts scoped', 'Avoid invisible spend']
  },
  {
    slug: 'cost-of-context',
    title: 'The Cost of Context',
    eyebrow: 'Systems Thinking',
    date: '2026-06-06',
    minutes: 4,
    summary:
      'Why context is the hidden variable behind AI quality, cost, latency, and hallucination risk.',
    body: [
      'Context is leverage, but it is also liability. Give too little context and the model guesses. Give too much and the model gets expensive, slow, and distracted.',
      'Good AI workflows are really context design workflows. The question is not “can the model read everything?” The question is “what does it actually need to make the next correct move?”',
      'That shift changes how I prompt, how I structure projects, and how I decide when a tool should act automatically.'
    ],
    takeaways: ['Context is design', 'More is not always better', 'Cut noise aggressively', 'Make the next move explicit']
  }
]

export function getPost(slug) {
  return posts.find((post) => post.slug === slug)
}
