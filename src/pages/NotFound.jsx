import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
export default function NotFound() {
  return <section className="page shell"><SEO title="404" /><p className="eyebrow">404</p><h1>This panel got blasted out of the viewport.</h1><Link className="button primary" to="/">Return home</Link></section>
}
