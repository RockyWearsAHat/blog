export default function AdSlot({ label = 'Quiet sponsor/ad slot' }) {
  return (
    <aside className="ad-slot" aria-label={label}>
      <span>{label}</span>
      <small>reserved · non-intrusive</small>
    </aside>
  )
}
