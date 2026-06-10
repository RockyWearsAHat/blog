import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="prose">
      <h1>Page not found.</h1>
      <p>This route does not exist yet.</p>
      <Link className="button primary" to="/">Back home</Link>
    </div>
  )
}
