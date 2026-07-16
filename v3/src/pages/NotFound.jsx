import { useEffect } from 'react'
import { TLink } from '../lib/AppContext'

export default function NotFound() {
  useEffect(() => {
    document.title = '404 — André Finageiv'
  }, [])
  return (
    <section className="nf container">
      <h1>404</h1>
      <p>This page does not exist.</p>
      <TLink to="/" className="link-tail">Back to the index</TLink>
    </section>
  )
}
