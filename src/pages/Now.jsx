import SectionHeader from '../components/SectionHeader.jsx'

export default function Now() {
  return (
    <div className="prose">
      <SectionHeader eyebrow="Now" title="What I’m working on now.">
        A living snapshot of active projects, experiments, and priorities.
      </SectionHeader>
      <h2>Current focus</h2>
      <ul>
        <li>Building Waldmann Lab as a home for projects, writing, and tools.</li>
        <li>Designing practical AI-assisted coding workflows with better context control.</li>
        <li>Turning small technical experiments into useful public tools.</li>
      </ul>
      <h2>Current questions</h2>
      <ul>
        <li>How can AI help developers without hiding cost, complexity, or judgment?</li>
        <li>What should stay local, and what is worth sending to a paid model?</li>
        <li>How do you make technical learning feel interactive instead of passive?</li>
      </ul>
    </div>
  )
}
