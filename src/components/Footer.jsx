import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="footer-shell">
      <div>
        <strong>{site.name}</strong>
        <p>{site.description}</p>
      </div>
      <div className="footer-links">
        <a href={site.github}>GitHub @{site.handle}</a>
        <a href={site.gists}>Gists</a>
        <a href="/workflow">Workflow</a>
        <a href="/admin">Admin</a>
      </div>
    </footer>
  )
}
