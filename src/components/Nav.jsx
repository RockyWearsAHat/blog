import { NavLink, Link } from 'react-router-dom'
import { site } from '../data/site'

export default function Nav() {
  return (
    <header className="nav-shell">
      <Link to="/" className="brand-mark" aria-label={`${site.name} home`}>
        <span className="brand-glyph">R</span>
        <span><strong>{site.name}</strong><small>@{site.handle}</small></span>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        {site.nav.map((item) => (
          <NavLink key={item.href} to={item.href} className={({ isActive }) => isActive ? 'active' : undefined}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
