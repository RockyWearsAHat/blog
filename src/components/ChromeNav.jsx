import { NavLink } from 'react-router-dom'
import { navItems, site } from '../data/site.js'

export default function ChromeNav() {
  return (
    <header className="chrome-nav" aria-label="Primary navigation">
      <NavLink to="/" className="brand-mark" aria-label="Waldmann Labs home">
        <span className="brand-sigil">WL</span>
        <span>
          <strong>{site.name}</strong>
          <em>@{site.handle}</em>
        </span>
      </NavLink>
      <nav>
        {navItems.map((item) => (
          <NavLink key={item.href} to={item.href} className={({ isActive }) => (isActive ? 'active' : undefined)}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <a className="repo-pill" href={site.repo} target="_blank" rel="noreferrer">
        GitHub ↗
      </a>
    </header>
  )
}
