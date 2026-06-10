import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { navItems, site } from '../data/site.js'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" onClick={() => setOpen(false)}>
        <span className="brand-mark">AW</span>
        <span>
          <strong>{site.name}</strong>
          <small>{site.labName}</small>
        </span>
      </NavLink>

      <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={open ? 'nav open' : 'nav'}>
        {navItems.map((item) => (
          <NavLink key={item.href} to={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
