import SectionHeader from '../components/SectionHeader.jsx'

export default function About() {
  return (
    <div className="prose">
      <SectionHeader eyebrow="About" title="Alex Waldmann">
        Developer, builder, and systems thinker focused on software, AI-assisted tools, automation, and experiments that make complex things easier to understand.
      </SectionHeader>
      <p>This site is not a generic tech blog. It is a public engineering notebook: what I am building, what I am learning, what I think is broken, and what I am trying next.</p>
      <p>The work here spans software projects, AI workflows, interactive tools, technical essays, creative coding, and experiments that may become products later.</p>
      <h2>How I think about AI</h2>
      <p>AI is useful when it sharpens thinking. It is dangerous when it replaces ownership. My interest is in using AI as leverage while keeping human judgment, system design, and debugging skill intact.</p>
    </div>
  )
}
