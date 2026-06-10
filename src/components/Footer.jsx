import { Link } from 'react-router-dom'
import { site } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{site.labName}</strong>
        <p>{site.description}</p>
      </div>
      <div className="footer-links">
        <Link to="/writing">Writing</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/lab">Lab</Link>
        <Link to="/hire">Hire</Link>
        <Link to="/support">Support</Link>
      </div>
    </footer>
  )
}
